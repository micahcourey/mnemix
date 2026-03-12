# Memory Model

Mnemix stores structured memory records instead of raw transcript chunks. Each record is designed to be easy to retrieve, inspect, rank, and reuse in later sessions.

## Core fields

| Field | Purpose |
|---|---|
| `id` | Stable identifier for the memory record |
| `scope` | Namespace for a repository, workspace, project, or other context |
| `kind` | Memory type such as `observation`, `decision`, `preference`, `summary`, `fact`, `procedure`, or `warning` |
| `title` | Short human-readable label |
| `summary` | Compact version used in recall and listings |
| `detail` | Full detail for inspection and deeper context |
| `importance` | Score used to help rank results |
| `confidence` | Score indicating how reliable the memory is |
| `tags` | Free-form labels for filtering and search |
| `entities` | Named people, tools, systems, or concepts referenced by the memory |
| `pin_reason` | When present, marks the memory as pinned and explains why it should surface early |

## Why structure matters

The record shape is what makes layered recall practical. A short summary can be surfaced first, while full detail remains available when a user or agent needs to drill in.

This also improves:

- search relevance
- human inspection from the CLI
- filtering by scope, kind, tags, and entities
- long-lived memory hygiene over time

## Memory kinds

The built-in kinds are intentionally simple:

| Kind | Best used for |
|---|---|
| `observation` | Notable facts from a session or task |
| `decision` | Architectural or workflow choices |
| `preference` | User or agent preferences that should influence future work |
| `summary` | Distilled rollups of broader activity |
| `fact` | Stable project or domain knowledge |
| `procedure` | Repeatable steps, commands, or workflows |
| `warning` | Risks, constraints, and things to avoid |

These kinds help Mnemix stay explainable. A retrieved memory should communicate not only what it says, but what role it plays.

## Scopes

Scopes let one store hold memory for multiple contexts without mixing them together. A scope can represent:

- a repository
- a workspace
- a user profile
- a session family
- another application-defined boundary

This gives agents a way to stay local and relevant instead of searching every memory ever recorded.

## Pinned memories

Pinned memories are the smallest, highest-priority layer of recall. They are appropriate for:

- durable user preferences
- architectural decisions that shape many tasks
- operational warnings that should not be forgotten

Pinning is meant to be selective. If everything is pinned, nothing is.
