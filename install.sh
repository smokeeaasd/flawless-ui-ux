#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./install.sh [--codex | --opencode | --antigravity | --all-agents] [--project]

Install the bundled skill for Codex, OpenCode, Antigravity, or all (the default).
Use --project to install into the current project's agent directories.
Existing installations are never overwritten.
Requires Bash. On Windows, run with Git Bash or WSL.
EOF
}

agent=all
project=false
for argument in "$@"; do
  case "$argument" in
    --codex) agent=codex ;;
    --opencode) agent=opencode ;;
    --antigravity) agent=antigravity ;;
    --all-agents) agent=all ;;
    --project) project=true ;;
    -h|--help) usage; exit 0 ;;
    *) printf 'Unknown option: %s\n' "$argument" >&2; usage >&2; exit 2 ;;
  esac
done

repository_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source_dir="$repository_dir/skills/flawless-ui-ux"
if [[ ! -f "$source_dir/SKILL.md" ]]; then
  printf 'This checkout does not contain an installable skill yet.\n' >&2
  exit 1
fi

destinations=()
add_destination() {
  local candidate="$1" existing
  for existing in "${destinations[@]}"; do
    [[ "$existing" == "$candidate" ]] && return 0
  done
  destinations+=("$candidate")
}
if [[ "$agent" == codex || "$agent" == all ]]; then
  if $project; then
    add_destination "$PWD/.agents/skills/flawless-ui-ux"
  else
    add_destination "${CODEX_HOME:-$HOME/.codex}/skills/flawless-ui-ux"
  fi
fi
if [[ "$agent" == opencode || "$agent" == all ]]; then
  if $project; then
    add_destination "$PWD/.opencode/skills/flawless-ui-ux"
  else
    add_destination "${XDG_CONFIG_HOME:-$HOME/.config}/opencode/skills/flawless-ui-ux"
  fi
fi
if [[ "$agent" == antigravity || "$agent" == all ]]; then
  if $project; then
    add_destination "$PWD/.agents/skills/flawless-ui-ux"
  else
    add_destination "$HOME/.gemini/config/skills/flawless-ui-ux"
  fi
fi

for destination in "${destinations[@]}"; do
  if [[ -e "$destination" || -L "$destination" ]]; then
    printf 'Installation already exists: %s\n' "$destination" >&2
    exit 1
  fi
done
for destination in "${destinations[@]}"; do
  mkdir -p -- "$(dirname -- "$destination")"
  mkdir -- "$destination"
  cp -R -- "$source_dir/." "$destination/"
  printf 'Installed flawless-ui-ux: %s\n' "$destination"
done
