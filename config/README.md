This directory is used to install global stuff

This is to avoid having stuff in global monorepo's `node_modules` - we don't want Node to climb up there from `packages/*/`

`packages/*` are self-contained.

Things here:

- `turbo` installation
- `eslint`, `jest`, `prettier` installation for VSCode plugins
  - They are installed per-package too for use with `prepublishOnly` scripts
