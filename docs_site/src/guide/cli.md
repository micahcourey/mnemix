# CLI

The `mnemix` CLI is the primary interface for working with a local store from the terminal. It is designed for two modes:

- human-readable output for day-to-day inspection
- structured `--json` output for scripting and higher-level clients

## Command overview

```bash
mnemix [--store PATH] [--json] <command>
```

Available commands:

- `init`
- `remember`
- `recall`
- `search`
- `show`
- `pins`
- `history`
- `checkpoint`
- `versions`
- `restore`
- `optimize`
- `stats`
- `export`
- `import`

The default store path is `.mnemix`.

## Common workflow

### Initialize a store

```bash
mnemix --store .mnemix init
```

### Save a memory

```bash
mnemix --store .mnemix remember \
  --id memory:storage-decision \
  --scope repo:mnemix \
  --kind decision \
  --title "Use LanceDB as the local store" \
  --summary "LanceDB provides local persistence, search, and version history." \
  --detail "The initial implementation uses LanceDB for the primary storage path." \
  --importance 90 \
  --confidence 95 \
  --tag architecture \
  --tag storage \
  --pin-reason "Core project decision"
```

### Recall layered context

```bash
mnemix --store .mnemix recall --scope repo:mnemix
```

By default, `recall` uses `summary-then-pinned` disclosure depth. You can also set:

- `summary-only`
- `summary-then-pinned`
- `full`

### Search the archive

```bash
mnemix --store .mnemix search \
  --text "storage decision" \
  --scope repo:mnemix \
  --limit 10
```

### Inspect a single memory

```bash
mnemix --store .mnemix show --id memory:storage-decision
```

### List pinned memories

```bash
mnemix --store .mnemix pins --scope repo:mnemix --limit 20
```

## History and recovery

### Create a checkpoint

```bash
mnemix --store .mnemix checkpoint \
  --name before-refactor \
  --description "Stable state before reorganizing the workspace"
```

### List versions

```bash
mnemix --store .mnemix versions --limit 20
```

### Restore by checkpoint or version

```bash
mnemix --store .mnemix restore --checkpoint before-refactor
```

```bash
mnemix --store .mnemix restore --version 12
```

`restore` creates a new current head from the selected historical state. It does not delete prior history.

## Maintenance and portability

### Inspect store statistics

```bash
mnemix --store .mnemix stats --scope repo:mnemix
```

### Optimize the store

```bash
mnemix --store .mnemix optimize --older-than-days 30
```

To allow pruning of older versions:

```bash
mnemix --store .mnemix optimize --prune --older-than-days 30
```

### Export a store

```bash
mnemix --store .mnemix export --destination ./backups/mnemix-export
```

### Import a store

```bash
mnemix --store .mnemix import --source ./backups/mnemix-export
```

Imports are staged onto an isolated branch so the current main store remains unchanged until the staged data is reviewed.

## JSON mode

Pass `--json` to receive a stable machine-readable response envelope:

```bash
mnemix --store .mnemix --json stats
```

Successful commands return structured data under a `kind` and `data` envelope. Failures return a structured `error` payload on stderr. The Python client uses this interface directly.

## Command notes

- `history` and `versions` are inspection commands for store history.
- `checkpoint` creates a stable, human-readable reference to the current version.
- `restore` always requires exactly one target: `--checkpoint` or `--version`.
- `optimize` is conservative by default and only prunes old versions when `--prune` is set.
- `remember` supports tags, entities, metadata, and source attribution fields for richer recall and inspection.
