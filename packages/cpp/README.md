Even though it's C++, we have scripting using `package.json` and `pnpm`. Scripts
defined in `package.json` are run using `v` command, which comes from
`@voltiso/script`, and runs scripts from either `package.json` or `scripts.ts`
file, checking parent directories if there's no match.

Use this directory to run commands, event if working with e.g. `util`
subdirectory.

# Prerequisites

You probably need to install:

```sh
sudo apt update
sudo snap install cmake --classic
sudo apt install build-essential
sudo apt install zip
sudo apt install pkg-config
sudo apt install clang-20
```

# Testing

Use `pnpm test`.
