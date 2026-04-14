# Production Readiness Review (PRR)

Mnemix `v0.4.0` is the next minor release after `v0.3.0`. It packages the
optional LanceDB vector retrieval layer, the CLI and TUI workflows needed to
configure and use embeddings in practice, and the follow-on policy-runner work
that rounds out enforcement lifecycle and adapter coverage. Publication still
flows through the GitHub Release to PyPI trusted-publishing workflow after this
release-prep PR merges.

---

## Release Schedule

| Field | Value |
|-------|-------|
| **Release Date** | 2026-04-13 |
| **Release Window** | Pending merge and tag publish |
| **Version** | `v0.4.0` |
| **Release Type** | Minor |
| **Release Epic** | `N/A` |

## Release Scope

This release rolls up everything merged after `v0.3.0`, with the main user- and
operator-facing changes centered on vector retrieval, embedding-provider setup,
vector-aware terminal workflows, and the completed policy-runner lifecycle.

| PR / Change | Summary | Status |
|-------------|---------|--------|
| `#96` | Add optional LanceDB vector retrieval contracts, backend support, status, enablement, backfill, and semantic retrieval | Done |
| `#97` | Add embedding-provider setup, vector-aware CLI/TUI flows, and provider-backed hybrid or semantic search and recall | Done |
| `#98` | Complete policy runner follow-ons with clear/cleanup flows, adapter composition, and enforcement examples | Done |
| `#95` | Expand docs-site coverage for `mnemix-workflow`, TUI guidance, and website ecosystem messaging | Done |
| Release prep | Bump workspace and Python package versions to `0.4.0` | Done |

## Stakeholders Approval & Notifications

### Internal Team

| Stakeholder | Role | Approval | Date |
|-------------|------|----------|------|
| Micah Courey | Maintainer / releaser | Pending final release approval | 2026-04-13 |

## User Acceptance Test

UAT for `v0.4.0` focuses on release readiness plus the three major capability
areas introduced since `v0.3.0`: vector retrieval, embedding-provider setup and
vector-aware terminal workflows, and completed policy-runner enforcement flows.

| Test Scenario | Tested By | Result |
|---------------|-----------|--------|
| Run repo verification via `./scripts/check.sh` | Maintainer | Pass |
| Run Python package release preflight via `./scripts/check-python-package.sh` | Maintainer | Pass |
| Enable vectors against a temporary store, inspect `mnemix vectors status`, and run vector backfill / readiness flows | Maintainer | Pass |
| Run semantic and hybrid `search` / `recall` with a configured embedding provider and confirm provenance appears in CLI / TUI output | Maintainer | Pass |
| Verify policy clear / cleanup flows, adapter evidence recording, and policy regression coverage through the checked test suite | Maintainer | Pass |

## Release Known Issues

This release has no known blocking regressions, but a few non-blocking
constraints remain expected in the current repo shape.

| Issue | Severity | Impact | Planned Fix |
|-------|----------|--------|-------------|
| `./scripts/check.sh` still warns that `mnemix` and `mx` share the same `src/main.rs` binary entrypoint | Low | Cosmetic warning during checks; validation still passes | Keep or revisit if the binary layout changes later |
| `cargo-deny` still reports dependency duplication warnings such as `crossterm` in the lockfile | Low | Noise during release verification; no check failure | Reduce duplicate dependency versions in a follow-up dependency cleanup |
| Semantic and hybrid retrieval require an explicit compatible embedding provider configuration | Low | Vector commands and semantic retrieval fail fast until a provider is configured, which may surprise first-time operators | Keep the explicit setup flow and improve docs/examples as adoption grows |
| Downstream consumers cannot rely on vector support until `v0.4.0` is published to PyPI and adopted | Low | Integrations such as `mnemix-studio` must wait for the new package release before using vector-capable Python surfaces | Publish `v0.4.0`, then validate downstream adoption before considering `v1.0.0` |

## Release Test Results

Release verification combines Rust workspace checks, Python package preflight,
and manual vector/TUI smoke checks before the `v0.4.0` GitHub Release is
published.

### Security, Performance, & Accessibility

| Test Type | Status | Notes |
|-----------|--------|-------|
| Security | Pass | PyPI publishing remains on GitHub OIDC trusted publishing, and provider-backed vector setup keeps credentials in explicit local configuration rather than hidden fallback behavior |
| Performance | Pass | Lexical retrieval remains the baseline, while vectors stay optional per store and per query so operators can choose the added semantic cost only when needed |
| Section 508 / Accessibility | Partial | The TUI remains keyboard-first and avoids color-only signaling, but terminal accessibility still depends on the user’s terminal environment |
| UX | Pass | The release adds provider setup, vector readiness visibility, retrieval provenance, and clearer policy-runner enforcement examples |

### Regression Testing

| Test Type | Coverage | Status |
|-----------|----------|--------|
| Automated | `./scripts/check.sh`, `./scripts/check-python-package.sh`, targeted vector tests, and policy-focused test suites | Pass |
| Manual | Temporary-store smoke test of vector status/backfill plus semantic or hybrid CLI/TUI retrieval | Pass |

## Deployment Checklist

- [x] Release prep branch created for `v0.4.0`
- [x] Workspace version updated to `0.4.0`
- [x] Python package version updated to `0.4.0`
- [x] `./scripts/check-python-package.sh` passing
- [x] `./scripts/check.sh` passing
- [x] Release notes and changelog updated for `v0.4.0`
- [ ] Release-prep PR merged to `main`
- [ ] GitHub Release published from tag `v0.4.0`

## Production Post-Deployment Verification

- [ ] Git tag `v0.4.0` published from `main`
- [ ] GitHub Release body updated from `RELEASE_NOTES.md`
- [ ] PyPI publish workflow completed successfully
- [ ] `pip install mnemix==0.4.0` confirmed against the live PyPI package
- [ ] Stakeholders notified of successful publication

## Release Statistics

Planned GitHub release URL after publication:
`https://github.com/micahcourey/mnemix/releases/tag/v0.4.0`

| Metric | Value |
|--------|-------|
| Release prep commits on branch | 1 |
| Merged mainline PRs included since `v0.3.0` | 4 |
| New major user-facing capabilities | 3 |
| Release-preflight scripts run for prep | 2 |

## Notes & Miscellaneous Items

After this PR merges, publish from a clean `main` checkout with:

```bash
./scripts/publish-release.sh 0.4.0
```

If the GitHub release notes need an update after publication, edit the release
body in place with:

```bash
gh release edit v0.4.0 --notes-file RELEASE_NOTES.md
```
