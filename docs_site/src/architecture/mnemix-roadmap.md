# Status and Roadmap

Mnemix is an active local-first memory project with the core interfaces already taking shape around the CLI, Python client, structured memory model, and version-aware storage behavior.

## Current focus

The current direction is centered on four areas:

- a clear and stable memory model
- a practical terminal-first workflow
- safe versioning, checkpoints, and restore behavior
- thin integration surfaces for higher-level tools

## Near-term priorities

### Solidify the user-facing contract

The CLI and Python interfaces should stay aligned and predictable, with JSON mode acting as a stable automation boundary.

### Improve memory workflows

That includes strengthening the common flows around:

- writing memories
- recalling layered context
- searching archived knowledge
- inspecting history and checkpoints

### Keep recovery conservative

Optimize, restore, import, and cleanup behavior should continue to prioritize inspectability and recoverability over aggressive automation.

### Expand integration depth carefully

The project can grow into richer tooling and adapters, but only after the core product behaviors are stable and easy to reason about.

## What is intentionally out of scope for the public docs

This docs site focuses on the product and its interfaces. Internal planning notes, implementation experiments, and agent-specific research material are useful during development, but they are not treated as part of the public documentation set.

## Direction of travel

The broader roadmap remains consistent:

- make local memory practical for day-to-day agent work
- preserve a clean and inspectable history model
- support scripting and agent integrations without splitting the product into separate implementations
