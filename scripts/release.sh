#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF' >&2
usage: ./scripts/release.sh <version> [--dry-run]

Examples:
  ./scripts/release.sh 0.2.2
  ./scripts/release.sh 0.2.2 --dry-run

This script automates the release checklist for versions that only require
updating Cargo.toml and python/mnemix/_version.py before the release.
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
if git rev-parse "$tag" >/dev/null 2>&1; then
  echo "tag already exists locally: $tag" >&2
  exit 1
fi

if git ls-remote --tags origin "refs/tags/$tag" | grep -q .; then
  echo "tag already exists on origin: $tag" >&2
  exit 1
fi

if gh release view "$tag" >/dev/null 2>&1; then
  echo "GitHub release already exists: $tag" >&2
  exit 1
fi

run git fetch origin main --tags
run git pull --ff-only origin main

replace_workspace_version
replace_python_version

workspace_version="$(read_workspace_version)"
python_version="$(read_python_version)"

if [[ "$workspace_version" != "$version" || "$python_version" != "$version" ]]; then
  echo "version alignment failed: Cargo.toml=$workspace_version python=$python_version expected=$version" >&2
  exit 1
fi

run ./scripts/check-python-package.sh

run git add Cargo.toml python/mnemix/_version.py
run git commit -m "chore(release): prepare v$version"
run git push origin main

run git tag -a "$tag" -m "$tag"
run git push origin "$tag"
run gh release create "$tag" --title "$tag" --generate-notes

cat <<EOF
Release preparation complete for $tag.

Checklist follow-up:
- Wait for .github/workflows/publish-python.yml to finish successfully.
- Verify the new version on PyPI and in a clean install.
EOF
