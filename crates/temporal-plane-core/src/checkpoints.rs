//! Product-level versioning and checkpoint abstractions.

use serde::{Deserialize, Serialize};

use crate::{CheckpointName, RecordedAt};

/// A concrete storage revision number surfaced as a product concept.
#[derive(Clone, Copy, Debug, Eq, PartialEq, Ord, PartialOrd, Serialize, Deserialize)]
pub struct VersionNumber(u64);

impl VersionNumber {
    /// Creates a version number.
    #[must_use]
    pub const fn new(value: u64) -> Self {
        Self(value)
    }

    /// Returns the numeric revision value.
    #[must_use]
    pub const fn value(self) -> u64 {
        self.0
    }
}

/// A request to create a stable checkpoint.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub struct CheckpointRequest {
    name: CheckpointName,
    description: Option<String>,
}

impl CheckpointRequest {
    /// Creates a checkpoint request.
    #[must_use]
    pub fn new(name: CheckpointName, description: Option<String>) -> Self {
        Self { name, description }
    }

    /// Returns the requested checkpoint name.
    #[must_use]
    pub const fn name(&self) -> &CheckpointName {
        &self.name
    }

    /// Returns the optional description.
    #[must_use]
    pub fn description(&self) -> Option<&str> {
        self.description.as_deref()
    }
}

/// A user-visible named checkpoint.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub struct Checkpoint {
    name: CheckpointName,
    version: VersionNumber,
    created_at: RecordedAt,
    description: Option<String>,
}

impl Checkpoint {
    /// Creates a new checkpoint record.
    #[must_use]
    pub fn new(name: CheckpointName, version: VersionNumber, description: Option<String>) -> Self {
        Self {
            name,
            version,
            created_at: RecordedAt::now(),
            description,
        }
    }

    /// Returns the checkpoint name.
    #[must_use]
    pub const fn name(&self) -> &CheckpointName {
        &self.name
    }

    /// Returns the referenced version.
    #[must_use]
    pub const fn version(&self) -> VersionNumber {
        self.version
    }

    /// Returns the creation timestamp.
    #[must_use]
    pub const fn created_at(&self) -> RecordedAt {
        self.created_at
    }

    /// Returns the optional description.
    #[must_use]
    pub fn description(&self) -> Option<&str> {
        self.description.as_deref()
    }
}

/// A compact checkpoint summary suited for inspection output.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub struct CheckpointSummary {
    name: CheckpointName,
    version: VersionNumber,
}

impl CheckpointSummary {
    /// Creates a compact summary.
    #[must_use]
    pub const fn new(name: CheckpointName, version: VersionNumber) -> Self {
        Self { name, version }
    }

    /// Returns the checkpoint name.
    #[must_use]
    pub const fn name(&self) -> &CheckpointName {
        &self.name
    }

    /// Returns the referenced version number.
    #[must_use]
    pub const fn version(&self) -> VersionNumber {
        self.version
    }
}

/// Selects a restore or inspection target without exposing raw storage internals.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub enum CheckpointSelector {
    /// Select by a named checkpoint.
    Named(CheckpointName),
    /// Select by a raw version number.
    Version(VersionNumber),
}

/// A history entry representing a visible version in the product model.
#[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
pub struct VersionRecord {
    version: VersionNumber,
    recorded_at: RecordedAt,
    checkpoint: Option<CheckpointSummary>,
    summary: Option<String>,
}

impl VersionRecord {
    /// Creates a version record.
    #[must_use]
    pub fn new(
        version: VersionNumber,
        recorded_at: RecordedAt,
        checkpoint: Option<CheckpointSummary>,
        summary: Option<String>,
    ) -> Self {
        Self {
            version,
            recorded_at,
            checkpoint,
            summary,
        }
    }

    /// Returns the version number.
    #[must_use]
    pub const fn version(&self) -> VersionNumber {
        self.version
    }

    /// Returns the timestamp attached to the version.
    #[must_use]
    pub const fn recorded_at(&self) -> RecordedAt {
        self.recorded_at
    }

    /// Returns the checkpoint summary if the version is tagged.
    #[must_use]
    pub const fn checkpoint(&self) -> Option<&CheckpointSummary> {
        self.checkpoint.as_ref()
    }

    /// Returns the optional history summary.
    #[must_use]
    pub fn summary(&self) -> Option<&str> {
        self.summary.as_deref()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn checkpoint_request_preserves_description() {
        let request = CheckpointRequest::new(
            CheckpointName::try_from("pre-import").expect("valid checkpoint name"),
            Some("before import".to_string()),
        );

        assert_eq!(request.description(), Some("before import"));
    }

    #[test]
    fn version_record_can_reference_checkpoint_summary() {
        let summary = CheckpointSummary::new(
            CheckpointName::try_from("milestone-1").expect("valid checkpoint"),
            VersionNumber::new(7),
        );
        let record = VersionRecord::new(
            VersionNumber::new(7),
            RecordedAt::now(),
            Some(summary.clone()),
            None,
        );

        assert_eq!(record.checkpoint(), Some(&summary));
    }
}
