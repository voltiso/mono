# `@voltiso/assertor`

Prune asserts from TypeScript transpiled code.

This package re-exports strict assert from the `assert` module (`export { strict as assert } from 'assert'`).

# Usage

Install this package and `ttypescript`:

```sh
pnpm add -D @voltiso/assertor
pnpm add -D ttypescript
```

Update `tsconfig.json` to add the transformer that prunes asserts:

```json
{
	"compilerOptions": {
		"plugins": [{ "transform": "@voltiso/assertor/transformer" }]
	},
}
```

⚠️ Finally, use `ttsc` instead of `tsc` to build!

# TODO

- Re-export jest's `expect`, etc.
