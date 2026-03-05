Even though it's C++, we have scripting using `package.json` and `pnpm`. Scripts
defined in `package.json` are run using `v` command, which comes from
`@voltiso/script`, and runs scripts from either `package.json` or `scripts.ts`
file, checking parent directories if there's no match.

Use this directory to run commands, event if working with e.g. `util`
subdirectory.

# Prerequisites

We're using Ubuntu on WSL.

You probably need to install:

```sh
sudo apt update
sudo snap install cmake --classic
sudo apt install build-essential
sudo apt install zip
sudo apt install pkg-config
sudo apt install clang-22
sudo apt install lld-22
sudo apt install libc++-22-dev
sudo apt install ninja-build
```

Add LLVM apt repo for `clang-22` (and `lld-22`) if not present.

You probably also want to install `clangd-22` for use with vscode/cursor/windsurf. You probably will need to update-alternatives clangd to point to this version, as the editor plugin is not configurable.

# Testing

Use `pnpm exec v test`.

# Benchmarks

Use `pnpm exec v bench`.
