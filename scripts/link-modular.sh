#!/bin/sh
# Install the dev `modular` wrapper into Bun's global bin directory.
#
# Replaces the bun-shebang symlink that `bun --cwd=packages/coding-agent link`
# creates (pointing at `src/cli.ts`) with the safer wrapper at
# `packages/coding-agent/scripts/modular`. See that wrapper's header comment for the
# bunfig.toml-preload bug it works around.
#
# We resolve Bun's global bin path defensively because `bun pm -g bin` aborts
# (`No package.json was found for directory "$HOME/.bun/install/global"`) on
# fresh hosts where the global install has not been initialized. Falling
# through that error would expand `$(bun pm -g bin)/modular` to `/modular` and try to
# write under `/` — see https://github.com/Krowli/modular/issues/3701.
set -e

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd -P)
target=$repo_root/packages/coding-agent/scripts/modular

if [ ! -x "$target" ]; then
	echo "link-modular: target wrapper not found or not executable: $target" >&2
	exit 1
fi

global_bin=$(bun pm -g bin 2>/dev/null || true)
if [ -z "$global_bin" ]; then
	global_bin=${BUN_INSTALL:-$HOME/.bun}/bin
fi

mkdir -p "$global_bin"
ln -sfn "$target" "$global_bin/modular"
echo "link-modular: linked $global_bin/modular -> $target"
