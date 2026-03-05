# `@voltiso/util`

- General TS/JS utility library
- No dependencies!
  - If you need a dependency, create a new package, e.g. `@voltiso/util.react`
- Not using sub-package imports on purpose - all names unique and exported from
  package root - for nice auto-imports and not having to think about where to
  put `lazyPromise` - `/function`, `/promise` or `/lazy`
