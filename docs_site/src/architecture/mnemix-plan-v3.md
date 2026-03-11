# Architecture Overview

Mnemix is a standalone, local-first memory layer for AI coding agents and related tooling. It is designed to be lightweight, serverless for local usage, easy to embed, and optimized for episodic and distilled memory with version-aware, time-travel capabilities.

## Core Principles

### Distilled over raw
Mnemix primarily stores durable, useful memories, not unbounded raw transcripts.

### Local-first
Local embedded usage is the default, ensuring data privacy and fast local access. This is provided by Arrow-native storage without requiring heavy daemon processes.

### Human-inspectable
Users can easily see what is stored, when it was stored, why it matched, whether it is pinned, and what changed over time.

### Progressive Disclosure
Only the most relevant, compact memory is loaded by default. Deeper context is fetched on demand to optimize token usage and keep the context window clean. 

### Safe by Default
Memory state over time is a core product feature. Retention, restore, cleanup, and optimization must preserve recoverability unless explicitly requested otherwise.

---

## Storage Foundation

Mnemix uses **LanceDB** + **Lance** as its storage foundation.
- **LanceDB**: Handles normal database and table workflows, providing FTS (Full-Text Search) and indexing.
- **Lance**: Provides lower-level version-control, dataset workflows, zero-copy rollbacks, and tags/checkpoints.

This tech stack enables local embedded operation, filesystem-backed persistence, and built-in versions and checkpoints.

---

## Memory Model

Mnemix stores structured memory objects rather than unstructured transcript logs.

### Primary Memory Categories:
- `episodic` — notable events, actions, outcomes
- `semantic` — generalized facts or stable project knowledge
- `preference` — user or agent preferences
- `procedural` — workflows, commands, playbooks, heuristics
- `summary` — distilled rollups of sessions/scopes
- `pinned` — explicitly elevated always-available context

---

## Memory Scopes and Layers

Mnemix supports explicit scoped memory boundaries (e.g., workspace, repository, user profile, session). Memory is inherently structured into retrieval layers:

1. **Pinned context**: Always small, highly relevant signal, loaded first.
2. **Working memory summaries**: Compact rollups of recent high-value context.
3. **Archival memory**: Broader historical memory corpus, retrieved safely on demand through lexical or filtering search.

---

## Retrieval Model

Retrieval in Mnemix is text-first, practical, and relies on metadata filtering and scoring layers to prioritize relevance, recency, and explicit `pinned` properties.
Retrieval prioritizes explainability—exposing why an item was surfaced to the agent.

---

## Versioning and Time-Travel

Mnemix makes it easy to inspect memory history and safely return to prior states.
- **Versions**: Concrete table state revisions.
- **Checkpoints**: User-meaningful named references to specific states.
- **Checkout/Restore**: View a prior state or create a new current state safely from a past checkpoint without destroying history.

---

## High-Level Architecture Components

1. **Core Domain Engine (Rust)**: Handles the memory model, retrieval semantics, pinning algorithms, and checkpoint abstractions safely and efficiently.
2. **Storage Backend**: Manages LanceDB operations, index lifecycle, and optimization helpers.
3. **CLI**: Supports human-facing workflows, JSON-machinereadable outputs, and inspection operations.
4. **Bindings (Python)**: Wraps the core engine into native modules for easy adoption by Python-based AI agents and workflows.
