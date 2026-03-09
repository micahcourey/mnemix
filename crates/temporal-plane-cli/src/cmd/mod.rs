use std::{collections::BTreeMap, path::Path};

use temporal_plane_core::{Confidence, Importance, MemoryRecord, PinState, QueryLimit};
use temporal_plane_lancedb::{LanceDbBackend, LanceDbError};

use crate::{
    cli::{Command, RememberArgs},
    errors::CliError,
    output::{
        CheckpointResultView, CommandOutput, MemoryListView, MemoryResultView, StatsResultView,
        StatusView, VersionListView, checkpoint_view, memory_detail_view, memory_summary_view,
        stats_view, version_view,
    },
};

mod checkpoint;
mod export;
mod history;
mod import;
mod init;
mod pins;
mod remember;
mod search;
mod show;
mod stats;
mod versions;

pub(crate) fn execute(command: &Command, store_path: &Path) -> Result<CommandOutput, CliError> {
    match command {
        Command::Init => init::run(store_path),
        Command::Remember(args) => remember::run(store_path, args),
        Command::Search(args) => search::run(store_path, args),
        Command::Show(args) => show::run(store_path, args),
        Command::Pins(args) => pins::run(store_path, args),
        Command::History(args) => history::run(store_path, args),
        Command::Checkpoint(args) => checkpoint::run(store_path, args),
        Command::Versions(args) => versions::run(store_path, args),
        Command::Stats(args) => stats::run(store_path, args),
        Command::Export(args) => export::run(store_path, args),
        Command::Import(args) => import::run(store_path, args),
    }
}

pub(super) fn open_store(store_path: &Path) -> Result<LanceDbBackend, CliError> {
    LanceDbBackend::open(store_path).map_err(|error| match error {
        LanceDbError::InvalidStorePath { path, .. } => CliError::StoreNotInitialized { path },
        other => CliError::Backend(other),
    })
}

pub(super) fn open_or_init_store(store_path: &Path) -> Result<LanceDbBackend, CliError> {
    LanceDbBackend::connect_or_init(store_path).map_err(Into::into)
}

pub(super) fn query_limit(value: u16) -> Result<QueryLimit, CliError> {
    QueryLimit::new(value).map_err(Into::into)
}

pub(super) fn build_memory_record(args: &RememberArgs) -> Result<MemoryRecord, CliError> {
    let metadata = args
        .metadata
        .iter()
        .map(|entry| (entry.key.clone(), entry.value.clone()))
        .collect::<BTreeMap<_, _>>();

    let builder = MemoryRecord::builder(args.id.clone(), args.scope.clone(), args.kind.into())
        .title(&args.title)?
        .summary(&args.summary)?
        .detail(&args.detail)?
        .importance(Importance::new(args.importance)?)
        .confidence(Confidence::new(args.confidence)?);

    let builder = args
        .tag
        .iter()
        .cloned()
        .fold(builder, temporal_plane_core::MemoryRecordBuilder::add_tag);
    let builder = args.entity.iter().cloned().fold(
        builder,
        temporal_plane_core::MemoryRecordBuilder::add_entity,
    );
    let builder = if let Some(pin_reason) = &args.pin_reason {
        builder.pin_state(PinState::pinned(pin_reason)?)
    } else {
        builder
    };
    let builder = if let Some(source_session_id) = &args.source_session_id {
        builder.source_session_id(source_session_id.clone())
    } else {
        builder
    };
    let builder = if let Some(source_tool) = &args.source_tool {
        builder.source_tool(source_tool.clone())
    } else {
        builder
    };
    let builder = if let Some(source_ref) = &args.source_ref {
        builder.source_ref(source_ref.clone())
    } else {
        builder
    };

    builder.metadata(metadata).build().map_err(Into::into)
}

pub(super) fn memory_result(
    command: &'static str,
    action: &'static str,
    record: &MemoryRecord,
) -> CommandOutput {
    CommandOutput::Memory(Box::new(MemoryResultView {
        command,
        action,
        memory: memory_detail_view(record),
    }))
}

pub(super) fn memory_list_result(
    command: &'static str,
    scope: Option<String>,
    query_text: Option<String>,
    records: &[MemoryRecord],
) -> CommandOutput {
    CommandOutput::MemoryList(Box::new(MemoryListView {
        command,
        scope,
        query_text,
        count: records.len(),
        memories: records.iter().map(memory_summary_view).collect(),
    }))
}

pub(super) fn checkpoint_result(
    action: &'static str,
    checkpoint: &temporal_plane_core::Checkpoint,
) -> CommandOutput {
    CommandOutput::Checkpoint(Box::new(CheckpointResultView {
        command: "checkpoint",
        action,
        checkpoint: checkpoint_view(checkpoint),
    }))
}

pub(super) fn version_list_result(
    command: &'static str,
    scope: Option<String>,
    versions: &[temporal_plane_core::VersionRecord],
) -> CommandOutput {
    CommandOutput::VersionList(Box::new(VersionListView {
        command,
        count: versions.len(),
        scope,
        versions: versions.iter().map(version_view).collect(),
    }))
}

pub(super) fn stats_result(stats: &temporal_plane_core::StatsSnapshot) -> CommandOutput {
    CommandOutput::Stats(Box::new(StatsResultView {
        command: "stats",
        stats: stats_view(stats),
    }))
}

pub(super) fn status_result(
    command: &'static str,
    status: &'static str,
    message: String,
    path: Option<String>,
    schema_version: Option<u64>,
) -> CommandOutput {
    CommandOutput::Status(Box::new(StatusView {
        command,
        status,
        message,
        path,
        schema_version,
    }))
}
