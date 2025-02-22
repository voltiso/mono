Even though it's C++, we have scripting using `package.json` and `pnpm`. Scripts
defined in `package.json` are run using `v` command, which comes from
`@voltiso/script`, and runs scripts from either `package.json` or `scripts.ts`
file, checking parent directories if there's no match.

Use this directory to run commands, event if working with e.g. `util`
subdirectory.

# Testing

Use `pnpm test`.
