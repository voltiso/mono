Types used by `@voltiso/schemar` (or `@voltiso/schemar.no-op`).

# Notes

- `@voltiso/util` is a peer dependency, because when it was a regular dependency
  (type-only), compiling a dependent library resulted in reference to `$_` that
  wasn't even imported to a `.d.ts` file - TS bug with `pnpm`?
