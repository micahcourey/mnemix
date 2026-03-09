//! Product-level maintenance and cleanup request contracts.

use serde::{Deserialize, Serialize};

use crate::{Checkpoint, RetentionPolicy, VersionNumber};

/// A request to run explicit store maintenance.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub struct OptimizeRequest {
    retention_policy: RetentionPolicy,
    prune_old_versions: bool,
}

impl OptimizeRequest {
    /// Creates a maintenance request using the provided retention policy.
    #[must_use]
    pub fn new(retention_policy: RetentionPolicy) -> Self {
        Self {
            retention_policy,
            prune_old_versions: false,
        }
    }

    /// Creates a maintenance request using conservative defaults.
    #[must_use]
    pub fn conservative() -> Self {
        Self::new(RetentionPolicy::conservative())
    }

    /// Returns the retention policy to apply.
    #[must_use]
    pub const fn retention_policy(&self) -> &RetentionPolicy {
        &self.retention_policy
    }

    /// Returns `true` when old versions should be pruned.
    #[must_use]
    pub const fn prune_old_versions(&self) -> bool {
        self.prune_old_versions
    }

    /// Enables or disables old-version pruning.
    #[must_use]
    pub fn with_prune_old_versions(mut self, prune_old_versions: bool) -> Self {
        self.prune_old_versions = prune_old_versions;
        self
    }
}

/// A product-level result returned by an optimize or cleanup flow.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub struct OptimizeResult {
    previous_version: VersionNumber,
    current_version: VersionNumber,
    pre_optimize_checkpoint: Option<Checkpoint>,
    compacted: bool,
    pruned_versions: u64,
    bytes_removed: u64,
}

impl OptimizeResult {
    /// Creates a maintenance result.
    #[must_use]
    pub const fn new(
        previous_version: VersionNumber,
        current_version: VersionNumber,
        pre_optimize_checkpoint: Option<Checkpoint>,
        compacted: bool,
        pruned_versions: u64,
        bytes_removed: u64,
    ) -> Self {
        Self {
            previous_version,
            current_version,
            pre_optimize_checkpoint,
            compacted,
            pruned_versions,
            bytes_removed,
        }
    }

    /// Returns the version that was current before maintenance started.
    #[must_use]
    pub const fn previous_version(&self) -> VersionNumber {
        self.previous_version
    }

    /// Returns the version that is current after maintenance completed.
    #[must_use]
    pub const fn current_version(&self) -> VersionNumber {
        self.current_version
    }

    /// Returns the checkpoint created before optimization, if any.
    #[must_use]
    pub const fn pre_optimize_checkpoint(&self) -> Option<&Checkpoint> {
        self.pre_optimize_checkpoint.as_ref()
    }

    /// Returns whether compaction was attempted.
    #[must_use]
    pub const fn compacted(&self) -> bool {
        self.compacted
    }

    /// Returns the number of old versions pruned.
    #[must_use]
    pub const fn pruned_versions(&self) -> u64 {
        self.pruned_versions
    }

    /// Returns the number of bytes removed during pruning.
    #[must_use]
    pub const fn bytes_removed(&self) -> u64 {
        self.bytes_removed
    }
}

#[cfg(test)]
mod tests {
    use std::time::UNIX_EPOCH;

    use crate::{CheckpointName, RecordedAt};

    use super::*;

    #[test]
    fn optimize_request_defaults_to_non_pruning() {
        let request = OptimizeRequest::conservative();

        assert!(!request.prune_old_versions());
        assert_eq!(request.retention_policy(), &RetentionPolicy::conservative());
    }

    #[test]
    fn optimize_result_tracks_prune_stats() {
        let checkpoint = Checkpoint::new_at(
            CheckpointName::try_from("pre-optimize-v4").expect("valid checkpoint"),
            VersionNumber::new(4),
            RecordedAt::new(UNIX_EPOCH),
            Some("before compaction".to_string()),
        );
        let result = OptimizeResult::new(
            VersionNumber::new(4),
            VersionNumber::new(5),
            Some(checkpoint.clone()),
            true,
            2,
            4096,
        );

        assert_eq!(result.previous_version(), VersionNumber::new(4));
        assert_eq!(result.current_version(), VersionNumber::new(5));
        assert_eq!(result.pre_optimize_checkpoint(), Some(&checkpoint));
        assert_eq!(result.pruned_versions(), 2);
        assert_eq!(result.bytes_removed(), 4096);
        assert!(result.compacted());
    }
}
