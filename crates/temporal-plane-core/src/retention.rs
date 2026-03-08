//! Conservative retention and cleanup policies.

use serde::{Deserialize, Serialize};

/// Describes how aggressively cleanup may remove historical versions.
#[derive(Clone, Copy, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub enum CleanupMode {
    /// Cleanup must always be explicit and conservative.
    ExplicitOnly,
    /// Cleanup may prune unprotected history after explicit review.
    AllowPrune,
}

/// Describes how checkpoints are protected during cleanup.
#[derive(Clone, Copy, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub enum CheckpointProtection {
    /// Every named checkpoint is protected from routine cleanup.
    ProtectAll,
    /// Only checkpoints selected by policy are protected.
    ProtectNamedOnly,
}

/// Describes what should happen before destructive cleanup begins.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub enum PreCleanupCheckpointPolicy {
    /// Create a new automatic checkpoint using the provided prefix.
    AutoCreate {
        /// Prefix used when generating a pre-cleanup checkpoint name.
        prefix: String,
    },
    /// Require the caller to create a checkpoint explicitly.
    RequireCallerProvided,
    /// Skip pre-cleanup checkpoint creation.
    Skip,
}

/// A storage-agnostic retention policy with conservative defaults.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub struct RetentionPolicy {
    recent_versions_to_keep: u64,
    checkpoint_protection: CheckpointProtection,
    cleanup_mode: CleanupMode,
    pre_cleanup_checkpoint: PreCleanupCheckpointPolicy,
}

impl RetentionPolicy {
    /// Creates a conservative default retention policy.
    #[must_use]
    pub fn conservative() -> Self {
        Self {
            recent_versions_to_keep: 50,
            checkpoint_protection: CheckpointProtection::ProtectAll,
            cleanup_mode: CleanupMode::ExplicitOnly,
            pre_cleanup_checkpoint: PreCleanupCheckpointPolicy::AutoCreate {
                prefix: "pre-cleanup".to_string(),
            },
        }
    }

    /// Returns the number of recent versions to preserve.
    #[must_use]
    pub const fn recent_versions_to_keep(&self) -> u64 {
        self.recent_versions_to_keep
    }

    /// Returns the checkpoint protection mode.
    #[must_use]
    pub const fn checkpoint_protection(&self) -> CheckpointProtection {
        self.checkpoint_protection
    }

    /// Returns the cleanup mode.
    #[must_use]
    pub const fn cleanup_mode(&self) -> CleanupMode {
        self.cleanup_mode
    }

    /// Returns the pre-cleanup checkpoint behavior.
    #[must_use]
    pub fn pre_cleanup_checkpoint(&self) -> &PreCleanupCheckpointPolicy {
        &self.pre_cleanup_checkpoint
    }
}

impl Default for RetentionPolicy {
    fn default() -> Self {
        Self::conservative()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_policy_is_conservative() {
        let policy = RetentionPolicy::default();

        assert_eq!(policy.cleanup_mode(), CleanupMode::ExplicitOnly);
        assert_eq!(
            policy.checkpoint_protection(),
            CheckpointProtection::ProtectAll
        );
        assert_eq!(policy.recent_versions_to_keep(), 50);
    }

    #[test]
    fn conservative_policy_creates_pre_cleanup_checkpoint() {
        let policy = RetentionPolicy::conservative();

        assert_eq!(
            policy.pre_cleanup_checkpoint(),
            &PreCleanupCheckpointPolicy::AutoCreate {
                prefix: "pre-cleanup".to_string(),
            }
        );
    }
}
