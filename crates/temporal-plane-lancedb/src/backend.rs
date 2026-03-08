//! Placeholder backend implementation.

use temporal_plane_core::traits::{BackendCapabilities, StorageBackend};

/// Placeholder backend type for the workspace baseline.
#[derive(Debug, Default)]
pub struct LanceDbBackend;

impl StorageBackend for LanceDbBackend {
    fn capabilities(&self) -> BackendCapabilities {
        BackendCapabilities::new([])
    }
}
