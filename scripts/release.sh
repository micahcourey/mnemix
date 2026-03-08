#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: $0 <version-tag>" >&2
  exit 1
fi

version_tag="$1"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "working tree must be clean before tagging a release" >&2
  exit 1
fi

if git rev-parse "$version_tag" >/dev/null 2>&1; then
  echo "tag already exists: $version_tag" >&2
  exit 1
fi

./scripts/check.sh

git tag -a "$version_tag" -m "Release $version_tag"
echo "Created tag $version_tag. Push with: git push origin $version_tag"
