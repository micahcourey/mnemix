# Mnemix Workflow

`mnemix-workflow` is a lightweight companion CLI (`mxw`) designed for repo-native planning with AI assistance. It provides a structured methodology for managing workstreams, patches, and related artifacts directly in your repository.

## Methodology

The `mnemix-workflow` methodology is based on several key artifacts that track the lifecycle of a technical change:

- **Workstream**: A long-running unit of work that consists of the following artifacts:
  - **Spec (`spec.md`)**: Defines the "what" and "why" of a change.
  - **Plan (`plan.md`)**: Outlines the "how" and specific steps.
  - **Tasks (`tasks.md`)**: A detailed checklist for the current work.
  - **Status (`STATUS.md`)**: Tracks the current state of a workstream or patch.
- **Patch**: A discrete set of changes tracked within a workstream.
- **Decisions**: Durable records of technical choices made during implementation.

## Contract Standards

The `mnemix-workflow` methodology includes first-class support for machine-readable API and data contracts. These are typically stored in a `contracts/` directory within a given workstream.

Supported standards include:

- **OpenAPI**: For RESTful API definitions.
- **AsyncAPI**: For event-driven and message-based API definitions.
- **JSON Schema**: For shared data models and validation artifacts.

You can scaffold and validate these contracts using the `mxw openapi`, `mxw asyncapi`, and `mxw schema` commands.

## Command Surface

The `mxw` CLI provides commands to manage these artifacts and drive the workflow.

### Initialize workflow

Before using `mxw` in a new repository, it must be initialized:

```bash
mxw init
```

### Manage workstreams

Create a new workstream:

```bash
mxw new "feature-name"
```

List existing workstreams:

```bash
mxw status list
```

Filter by status:

```bash
mxw status list --status "in-progress"
```

### Manage patches

Create a new patch within an initialized repository:

```bash
mxw patch new "small-fix"
```

### Validation

Run umbrella validation across tracked workflow artifacts to ensure consistency:

```bash
mxw validate
```

### Interactive UI

Open the interactive terminal UI for browsing and managing workstreams:

```bash
mxw ui
```

## Integration with Mnemix

`mnemix-workflow` is built on top of the Mnemix memory engine. It uses `mnemix` to store decisions and facts discovered during the workflow, ensuring that your planning history remains durable and searchable.

For more details on the `mnemix` core, see the [CLI guide](/guide/cli).
