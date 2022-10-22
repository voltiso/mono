# `@voltiso/transform/inline`

Type-alias-inlining using either:

1. `@inline` _JSDoc_ - to inline the type alias everywhere it's used (in `.d.ts`
   files)
2. `@inline` comment before usage of any alias to attempt inlining it (in
   `.d.ts` files)

Config:

- `onInlineError: 'fail'` - causes compiler to crash if type-inlining fails
  (usually symbols out of scope) - this applies only to the _JSDoc_ inlining
  method (`1.`)

# `@voltiso/transform/strip`

Strip symbols such as asserts from production code.

Config:

- `modules: string[]` - comment-out import declarations with given prefixes
- `symbols: string[]` - comment-out instructions containing `tokens` (function
  calls, etc.)
