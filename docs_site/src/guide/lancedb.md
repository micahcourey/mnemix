# Storage Foundation

Mnemix uses LanceDB and Lance as its storage foundation.

This pairing gives the project a local-first data layer with built-in version history, efficient columnar storage, and a clear path for inspection, restore, and future advanced workflows.

## Why LanceDB fits Mnemix

Mnemix needs a store that is:

- local-first by default
- embedded, with no always-on server requirement
- fast for structured reads and filtering
- capable of full-text retrieval
- version-aware, so changes remain inspectable over time

LanceDB is a strong match for those requirements. It provides the database-facing layer for tables, queries, and indexing, while Lance supplies the lower-level dataset and version primitives that make checkpoints, restore flows, and advanced branching possible.

## How Mnemix uses the storage stack

Mnemix treats the stack as two layers:

| Layer | Role in Mnemix |
|---|---|
| LanceDB | Table lifecycle, querying, indexing, and normal application storage flows |
| Lance | Dataset versioning, checkpoints, restore plumbing, and advanced branch-oriented workflows |

In practice, that means most product behavior is expressed in Mnemix terms such as memories, scopes, checkpoints, and recall layers, while the storage engine handles persistence and history underneath.

## What this enables

The current storage design supports:

- local filesystem-backed stores
- append and update workflows for memory records
- full-text retrieval
- version inspection
- named checkpoints
- restore to historical state as a new head
- export and staged import workflows

This is why the docs emphasize recoverability and inspectability. Storage is not just a persistence detail in Mnemix; it is part of the product contract.

## Local-first by default

Mnemix is built around the idea that an agent's memory store should live close to the work:

- in a repository
- in a user workspace
- in local development environments
- in test fixtures and reproducible examples

That default keeps the system simple to adopt and easy to inspect. A user can initialize a store, write memories, inspect results, and restore history without setting up remote infrastructure.

## Boundaries that matter

The storage engine is an implementation detail, but a deliberate one.

From a user perspective, the important contract is:

- memories are stored locally
- history is preserved
- checkpoints are stable references
- restores are safe and inspectable

From a project perspective, the important boundary is that storage-specific concerns stay behind the storage layer instead of leaking into the public mental model.

## What this page is not

This page is intentionally product-focused. It does not document storage SDK internals or implementation-language APIs. Those details are useful during implementation, but they are not part of the public documentation set.
