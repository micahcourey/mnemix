use std::path::Path;

use temporal_plane_core::{
    CheckpointSelector, RestoreRequest, VersionNumber, traits::RestoreBackend,
};

use crate::{
    cli::RestoreArgs,
    cmd::{open_store, restore_result},
    errors::CliError,
    output::CommandOutput,
};

pub(crate) fn run(store_path: &Path, args: &RestoreArgs) -> Result<CommandOutput, CliError> {
    let mut backend = open_store(store_path)?;
    let target = if let Some(name) = &args.checkpoint {
        CheckpointSelector::Named(name.clone())
    } else {
        CheckpointSelector::Version(VersionNumber::new(
            args.version.expect("clap should require a restore target"),
        ))
    };
    let result = backend.restore(&RestoreRequest::new(target))?;
    Ok(restore_result(&result))
}
