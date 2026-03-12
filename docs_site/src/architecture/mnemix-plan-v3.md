# Architecture Overview

Mnemix is a local-first memory system for agents. The architecture is designed around a simple public model:

- write structured memories
- retrieve only the most useful context first
- keep history inspectable and recoverable

## Design principles

### Structured over raw

Mnemix stores typed memory records rather than treating every transcript fragment as equal.

### Local-first

The default deployment model is a local store on the filesystem. This keeps setup small and inspection easy.

### Inspectable by default

Users should be able to understand what is stored, why it matched, and how the store changed over time.

### Progressive disclosure

Recall should return the smallest high-value context first, with deeper history available on demand.

### Recoverable by default

Version history, checkpoints, and conservative retention rules are part of the product contract.

## High-level components

| Component | Responsibility |
|---|---|
| Memory model | Defines the structure of stored records and recall layers |
| Storage layer | Persists records, indexes content, and manages version-aware state |
| CLI | Provides terminal workflows and machine-readable JSON output |
| Python client | Wraps the CLI contract for agent and script integrations |

## Request flow

```mermaid
flowchart LR
    A["Agent or User"] --> B["CLI or Python Client"]
    B --> C["Mnemix memory model and command layer"]
    C --> D["Local storage engine"]
    D --> C
    C --> B
    B --> A
```

## Retrieval flow

The retrieval model combines scope, text matching, and ranking signals to return results in layers:

- pinned context
- summaries
- archival results

This keeps normal agent startup lightweight while preserving access to the full store when needed.

## History model

Every write advances the store history. Named checkpoints provide stable references to meaningful states, and restore creates a new current head from an earlier point without deleting the path that led there.

That history model is what allows Mnemix to treat memory as durable state rather than temporary session data.
