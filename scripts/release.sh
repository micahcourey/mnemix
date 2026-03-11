#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF' >&2
usage: ./scripts/release.sh <version> [--dry-run]

Examples:
  ./scripts/release.sh 0.2.2
  ./scripts/release.sh 0.2.2 --dry-run

This script prepares a release branch and pull request for versions that only
require updating Cargo.toml and python/mnemix/_version.py before the release.
Run it from a clean checkout of the main branch.
EOF
  exit 1
}

if [[ $# -lt 1 || $# -gt 2 ]]; then
  usage
fi

version="$1"
dry_run="false"

if [[ $# -eq 2 ]]; then
  if [[ "$2" != "--dry-run" ]]; then
    usage
  fi
  dry_run="true"
fi

if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "version must match <major>.<minor>.<patch>: $version" >&2
  exit 1
fi

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"

require_command() {
  local command_name="$1"
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "required command not found: $command_name" >&2
    exit 1
  fi
}

run() {
  if [[ "$dry_run" == "true" ]]; then
    printf '[dry-run] %q' "$@"
    printf '\n'
    return 0
  fi

  "$@"
}

replace_workspace_version() {
  VERSION="$version" python3 - <<'PY'
from pathlib import Path
import os
import re

path = Path("Cargo.toml")
text = path.read_text()
updated, count = re.subn(
    r'(?m)^version = "[^"]+"$',
    f'version = "{os.environ["VERSION"]}"',
    text,
    count=1,
)
if count != 1:
    raise SystemExit("failed to update workspace version in Cargo.toml")
path.write_text(updated)
PY
}

replace_python_version() {
  VERSION="$version" python3 - <<'PY'
from pathlib import Path
import os
import re

path = Path("python/mnemix/_version.py")
text = path.read_text()
updated, count = re.subn(
    r'(?m)^__version__ = "[^"]+"$',
    f'__version__ = "{os.environ["VERSION"]}"',
    text,
    count=1,
)
if count != 1:
    raise SystemExit("failed to update python package version")
path.write_text(updated)
PY
}

read_workspace_version() {
  python3 - <<'PY'
from pathlib import Path
import re

text = Path("Cargo.toml").read_text()
match = re.search(r'(?m)^version = "([^"]+)"$', text)
if not match:
    raise SystemExit("workspace version not found in Cargo.toml")
print(match.group(1))
PY
}

read_python_version() {
  python3 - <<'PY'
from pathlib import Path
import re

text = Path("python/mnemix/_version.py").read_text()
match = re.search(r'(?m)^__version__ = "([^"]+)"$', text)
if not match:
    raise SystemExit("python package version not found")
print(match.group(1))
PY
}

require_command git
require_command python3
require_command gh

current_branch="$(git branch --show-current)"
if [[ "$current_branch" != "main" ]]; then
  echo "release script must run from the main branch; current branch is $current_branch" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "working tree must be clean before running the release script" >&2
  exit 1
fi

tag="v$version"
release_branch="engineer-gpt-5.4/chore/release-v$version"

if git show-ref --verify --quiet "refs/heads/$release_branch"; then
  echo "release branch already exists locally: $release_branch" >&2
  exit 1
fi

if git ls-remote --heads origin "$release_branch" | grep -q .; then
  echo "release branch already exists on origin: $release_branch" >&2
  exit 1
fi

if gh pr list --head "$release_branch" --json number --jq 'length' | grep -q '^1$'; then
  echo "a pull request already exists for branch: $release_branch" >&2
  exit 1
fi

run git fetch origin main --tags
run git pull --ff-only origin main
run git checkout -b "$release_branch"

if [[ "$dry_run" == "true" ]]; then
  cat <<EOF
[dry-run] would update Cargo.toml and python/mnemix/_version.py to $version
[dry-run] would run ./scripts/check-python-package.sh
[dry-run] would commit release prep on $release_branch
[dry-run] would push $release_branch and open a PR against main
EOF
else
  replace_workspace_version
  replace_python_version

  workspace_version="$(read_workspace_version)"
  python_version="$(read_python_version)"

  if [[ "$workspace_version" != "$version" || "$python_version" != "$version" ]]; then
    echo "version alignment failed: Cargo.toml=$workspace_version python=$python_version expected=$version" >&2
    exit 1
  fi

  ./scripts/check-python-package.sh

  git add Cargo.toml python/mnemix/_version.py
  git commit -m "chore(release): prepare v$version"
  git push -u origin "$release_branch"
  gh pr create \
    --base main \
    --head "$release_branch" \
    --title "chore(release): prepare v$version" \
    --body "## Summary
- bump the workspace version to $version
- bump the Python package version to $version
- run the Python package release preflight before publishing

## Verification
- ./scripts/check-python-package.sh

## Follow-up
- After this PR merges, run ./scripts/publish-release.sh $version from a clean main checkout."
fi

cat <<EOF
Release preparation complete for $tag.

Checklist follow-up:
- Review and merge the release-prep PR for $release_branch.
- After merge, run ./scripts/publish-release.sh $version from a clean main checkout.
EOF
