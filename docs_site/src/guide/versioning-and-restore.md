# Mnemix Versioning and Restore

Version history is a core part of the Mnemix product model, not a hidden storage detail. Every write creates a new version, which means memory changes remain inspectable over time.

## Core concepts

- `history` and `versions` let you inspect past store states
- `checkpoint` creates a stable named reference to the current version
- `restore` creates a new current head from a historical checkpoint or version

The important behavior is that restore does not erase the past. It produces a new head while leaving prior versions available for inspection.

## Restore targets

You can restore from:

- a checkpoint name
- a raw version number

Examples:

```bash
mnemix --store .mnemix restore --checkpoint before-refactor
```

```bash
mnemix --store .mnemix restore --version 12
```

## What restore returns

A restore operation reports:

- the previous current version
- the historical version that was selected
- the new current version created by the restore
- any automatic pre-restore checkpoint created for safety

This makes the operation auditable from both human and programmatic interfaces.

## Safety defaults

Mnemix uses conservative defaults around history-changing operations:

- restore automatically creates a pre-restore checkpoint when appropriate
- optimize automatically creates a pre-optimize checkpoint when appropriate
- pruning old versions is opt-in
- named checkpoints remain protected from routine cleanup

These defaults are designed to make recovery straightforward even when a user is experimenting or cleaning up a store.

## Recommended workflow

Before a risky change:

1. inspect the current state with `versions` or `history`
2. create a checkpoint if the current state is worth naming
3. run `restore` or `optimize`
4. inspect the resulting new head

## Related pages

- [Checkpoint & Retention Policy](/guide/checkpoint-and-retention-policy)
- [CLI](/guide/cli)
