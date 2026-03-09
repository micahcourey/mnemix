use std::path::Path;

use crate::{
    cli::ImportArgs,
    cmd::{open_store, status_result},
    errors::CliError,
    output::CommandOutput,
};

pub(crate) fn run(store_path: &Path, args: &ImportArgs) -> Result<CommandOutput, CliError> {
    let mut backend = open_store(store_path)?;
    backend.import_store(&args.source)?;
    Ok(status_result(
        "import",
        "ok",
        format!("Imported store from {}", args.source.display()),
        Some(store_path.display().to_string()),
        None,
    ))
}
