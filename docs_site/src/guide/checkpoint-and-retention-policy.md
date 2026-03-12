# Mnemix Checkpoint and Retention Policy

This page describes the default safety posture for checkpoints, restore, optimize, and cleanup behavior in Mnemix.

## Checkpoints

Checkpoints are named references to a specific store version. They are meant to be:

- human-readable
- stable over time
- useful during restore and review workflows

Good checkpoint names are short and descriptive:

- `before-import`
- `release-baseline`
- `before-refactor`
- `session-end-2026-03-08`

## Automatic safety checkpoints

Mnemix may create automatic checkpoints before history-changing operations. These use operation-specific prefixes such as:

- `pre-restore-v<version>`
- `pre-optimize-v<version>`
- `pre-import-v<version>`
- `pre-cleanup-v<version>`

If the current version is already protected by an equivalent checkpoint, Mnemix avoids creating unnecessary duplicates.

## Conservative retention defaults

The default retention policy favors recoverability:

- keep recent history generously
- require explicit prune intent
- protect checkpointed versions
- block pruning when protected old versions would be removed
- avoid deleting unverified data by default

This means cleanup is an explicit maintenance decision, not a silent background behavior.

## Optimize behavior

`optimize` is available as an explicit maintenance command. By default it focuses on compaction and leaves pruning disabled unless the caller opts in with `--prune`.

That default is deliberate:

- compaction improves store hygiene
- pruning changes retention guarantees
- checkpoint protection remains in force

## Import behavior

Imports are staged conservatively so users can inspect incoming data without rewriting the current main store immediately. This keeps import behavior aligned with the broader safety model: preserve inspectability first, then promote changes intentionally.

## Practical guidance

- Create explicit checkpoints before risky or meaningful transitions.
- Treat pruning as a deliberate cleanup action, not a routine step.
- Review versions before running restore or aggressive maintenance operations.
