#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/HireSwift-source.zip"
cd "$root"
zip -r "$out" . -x '.git/*' 'node_modules/*' 'dist/*' 'dist-server/*' '.env' '.env.local' '.env.production' '.env.development.local' '*.zip' '*.log' >/dev/null
echo "$out"
