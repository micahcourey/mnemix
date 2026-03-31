---
status: open
summary: "Add docs-site coverage for the Mnemix TUI and the mnemix-workflow companion CLI."
updated: "2026-03-31"
---

# Patch: Add docs-site coverage for the Mnemix TUI and mnemix-workflow

## Summary

Add docs-site coverage for the new human-facing Mnemix TUI and the companion
`mnemix-workflow` CLI. Scope: extend the existing CLI guide with a short TUI
section, add a new guide page that explains the `mnemix-workflow` methodology
and command surface, and wire the new content into docs-site navigation and
overview pages. Acceptance criteria: the docs site explains what `mnemix ui`
is for, includes the main interaction model at a glance, introduces
`mnemix-workflow` as the repo-native planning companion, and shows clear,
accurate example commands pulled from the real `mxw` CLI surface.

## Reason

The docs site currently documents the core Mnemix CLI, host adapters, and the
policy runner, but it does not yet explain the new browse-first TUI or the
companion workflow tool that now appears throughout repo-native planning. That
gap makes the docs lag behind the product and forces readers to infer workflows
from repository artifacts instead of having one clear introduction.

## Scope

- Add a short `mnemix ui` section to `docs_site/src/guide/cli.md`
- Describe the TUI as a browse-first human interface for recent, pinned, and
  search-driven memory inspection
- Call out the explicit `from` / `to` date filters and keyboard-first behavior
  without turning the CLI page into a full TUI manual
- Add a new guide page such as `docs_site/src/guide/mnemix-workflow.md`
- Explain the `mnemix-workflow` methodology in practical terms:
  workstreams, patches, `spec.md`, `plan.md`, `tasks.md`, `STATUS.md`, and
  decisions
- Document the most important `mxw` commands with concrete examples, including:
  `mxw init`, `mxw new`, `mxw patch new`, `mxw status list`, `mxw validate`,
  and `mxw ui`
- Update docs-site navigation in `docs_site/.vitepress/config.mts`
- Update the guide landing content in `docs_site/src/guide/index.md` so the new
  page is discoverable from the main docs flow

## Implementation Notes

- Keep the new TUI coverage short and practical; the primary goal is to help a
  reader understand when to use `mnemix ui` versus `search`, `pins`, and `show`
- Keep the `mnemix-workflow` page methodology-first, not just a flat command
  reference
- Example commands should reflect the actual current CLI in
  `../mnemix-workflow/src/cli.rs`
- Prefer examples that show a realistic repo flow, such as initializing
  workflow tracking, creating a workstream, creating a patch, checking status,
  validating artifacts, and opening the workflow TUI
- Link to the `mnemix-workflow` repository where helpful, but make the page
  useful even if the reader stays inside the Mnemix docs site

## Validation

- `pnpm --dir docs_site build`
- Verify the new guide page appears in the VitePress sidebar and can be reached
  from the guide landing page
- Verify the example commands are consistent with the current `mxw` CLI help
  surface
- Verify the CLI guide still reads cleanly and the new TUI section remains
  intentionally short

## References

- `docs_site/src/guide/cli.md`
- `docs_site/src/guide/index.md`
- `docs_site/.vitepress/config.mts`
- `../mnemix-workflow/src/cli.rs`
- `workflow/workstreams/003-human-memory-browser-tui/STATUS.md`

