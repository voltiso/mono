# `@voltiso/transform`

A set of TS transformers to be applied using `ts-patch`.

## `@voltiso/transform/inline`

Type-alias-inlining using either:

1. `@inline` _JSDoc_ - to inline the type alias everywhere it's used (in `.d.ts`
   files)
2. `@inline` comment before usage of any alias to attempt inlining it (in
   `.d.ts` files)

Config:

- `onInlineError: 'fail'` - causes compiler to crash if type-inlining fails
  (usually symbols out of scope) - this applies only to the _JSDoc_ inlining
  method (`1.`)

⚠️ Currently only checks if type names are in scope - but does not check if the
types are equal!

## `@voltiso/transform/strip`

Strip symbols such as asserts from production code.

Config:

- `modules: string[]` - comment-out import declarations with given prefixes
- `symbols: string[]` - comment-out instructions containing `tokens` (function
  calls, etc.)

## `@voltiso/transform/compat`

### Numeric separators

Removes numeric separators from the compiled code.

### Import extensions

#### Pitfalls

- Needs explicit module boundary types. Otherwise the transformer might fail for some fringe cases. This is not a big
  issue, as exporting types explicitly might speed up type-checking anyway. `@typescript-eslint/explicit-module-boundary-types`
	was checking it previously, but now we use Biome and there's no clear counterpart... just `useExplicitType` everywhere, not only on boundary.
