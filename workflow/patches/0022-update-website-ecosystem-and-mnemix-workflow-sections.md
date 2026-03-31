---
status: open
summary: "Re-enable the website ecosystem section and add homepage coverage for mnemix-workflow."
updated: "2026-03-31"
---

# Patch: Update website ecosystem and mnemix-workflow sections

## Summary

Update the marketing website so it reflects the current Mnemix ecosystem.
Scope: re-enable the homepage ecosystem card, expand that area to acknowledge
the broader toolchain again, and add a section that introduces
`mnemix-workflow` as the repo-native planning companion for AI-assisted
engineering work. Acceptance criteria: the homepage once again renders the
ecosystem section, `mnemix-workflow` has a clear introduction on the page with
use-case-oriented copy and a link target, and the layout feels intentional on
both desktop and mobile.

## Reason

The site still has an `Ecosystem` component, but it is no longer mounted in the
homepage app composition, and the current content only covers
`mnemix-context`. Since the repository now actively uses `mnemix-workflow` for
workstreams, patches, and repo-native planning, the website should communicate
that Mnemix is part of a broader operator and workflow toolchain instead of
looking like a single isolated binary.

## Scope

- Re-enable the existing ecosystem section by wiring
  `website/src/components/Ecosystem.tsx` back into `website/src/App.tsx`
- Refresh the ecosystem copy so it no longer feels limited to
  `mnemix-context` alone
- Add a dedicated homepage section or sub-section that introduces
  `mnemix-workflow`
- Explain `mnemix-workflow` in practical terms:
  repo-native workstreams, lightweight patches, and terminal-first planning for
  AI-assisted implementation
- Add a clear call to action or outbound link for `mnemix-workflow`
- Preserve the existing visual language of the site rather than introducing a
  disconnected design style
- Ensure the new or restored sections remain readable and well-spaced on mobile

## Implementation Notes

- The simplest first step is to restore `Ecosystem` in `website/src/App.tsx`,
  then decide whether `mnemix-workflow` belongs inside that component or in a
  new adjacent component
- If both companion tools are shown in the same area, the copy should clarify
  the distinction:
  `mnemix-context` for generated AI coding context and adapters,
  `mnemix-workflow` for repo-native planning and tracked execution
- If a new homepage section is introduced, the header navigation may need a new
  anchor so the content is discoverable
- Prefer concrete workflow language over vague “platform” copy
- Keep links targeted at the public repository or primary docs destination for
  `mnemix-workflow`

## Validation

- `pnpm --dir website build`
- Verify the ecosystem section renders again on the homepage
- Verify `mnemix-workflow` is introduced with a distinct value proposition and
  working link target
- Verify spacing and hierarchy on both desktop and mobile layouts
- Verify the updated section does not regress the existing header or footer flow

## References

- `website/src/App.tsx`
- `website/src/components/Ecosystem.tsx`
- `website/src/components/Header.tsx`
- `website/src/index.css`
- `https://github.com/micahcourey/mnemix-workflow`

