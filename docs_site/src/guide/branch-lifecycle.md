# Import Staging and Branches

Mnemix treats branch-aware storage as an advanced capability. Most users will interact with checkpoints and restore flows, while branch mechanics remain in the background to support isolated imports and future advanced workflows.

## Checkpoints versus branches

Use a checkpoint when you want a stable named point on the current history line.

Use a branch when you want isolated work that should not immediately affect the current main store.

| Use case | Prefer |
|---|---|
| Save a restore point before cleanup | Checkpoint |
| Protect a known-good milestone | Checkpoint |
| Stage an import for review | Branch |
| Try isolated experimental changes | Branch |

## Why import uses staging

The `import` command is intentionally conservative. Instead of rewriting the current store directly, imported records are staged onto an isolated branch.

That provides three benefits:

- the current main store remains unchanged
- imported data can be reviewed before being adopted
- recovery stays straightforward if the import is wrong or incomplete

## Operational model

At a high level, branch-aware workflows follow this shape:

1. create or select an isolated branch target
2. stage imported or experimental records there
3. inspect the staged result
4. decide how that work should be promoted or discarded

For standard user workflows, this remains an implementation detail behind import and recovery features rather than a required concept in everyday CLI usage.

## Retention implications

Branch data is handled conservatively:

- normal checkpoint protection still applies to the main history line
- optimize and prune flows should not silently discard staged work
- abandoned branches require explicit cleanup

## Scope of this feature

Branch-aware behavior exists to support safe advanced workflows. It is not intended to replace the simpler checkpoint-and-restore model that most users should rely on day to day.
