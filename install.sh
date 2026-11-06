#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: ./install.sh [AGENT] [--project]

Agent selectors: --codex, --opencode, --antigravity, --kiro, --cursor,
                --kilo, --copilot, --claude-code, --pi, --all-agents.
Install for all supported agents by default.
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
    --kiro) agent=kiro ;;
    --cursor) agent=cursor ;;
    --kilo) agent=kilo ;;
    --copilot) agent=copilot ;;
    --claude-code) agent=claude-code ;;
    --pi) agent=pi ;;
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
configured_root() {
  local directory="$1"
  case "$directory" in
    '~'|'~/'*) directory="$HOME${directory:1}" ;;
  esac
  printf '%s' "$directory"
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
if [[ "$agent" == kiro || "$agent" == all ]]; then
  if $project; then
    add_destination "$PWD/.kiro/skills/flawless-ui-ux"
  else
    add_destination "$HOME/.kiro/skills/flawless-ui-ux"
  fi
fi
for shared_agent in cursor kilo copilot; do
  if [[ "$agent" == "$shared_agent" || "$agent" == all ]]; then
    if $project; then
      add_destination "$PWD/.agents/skills/flawless-ui-ux"
    else
      add_destination "$HOME/.$shared_agent/skills/flawless-ui-ux"
    fi
  fi
done
if [[ "$agent" == claude-code || "$agent" == all ]]; then
  if $project; then
    add_destination "$PWD/.claude/skills/flawless-ui-ux"
  else
    add_destination "$(configured_root "${CLAUDE_CONFIG_DIR:-$HOME/.claude}")/skills/flawless-ui-ux"
  fi
fi
if [[ "$agent" == pi || "$agent" == all ]]; then
  if $project; then
    add_destination "$PWD/.agents/skills/flawless-ui-ux"
  else
    add_destination "$(configured_root "${PI_CODING_AGENT_DIR:-$HOME/.pi/agent}")/skills/flawless-ui-ux"
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
