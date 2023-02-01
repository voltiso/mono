# `@voltiso/script`

NPM scripts as code.

# Use in _YOUR_ project

```sh
pnpm add -D @voltiso/script
```

## Define some scripts

Create `scripts.ts` files in your project directory, or any directory above it,
e.g.:

```ts
// scripts.ts
import { parallel } from '@voltiso/script'

export const build = 'tsc -b'

export const lintEslint = 'eslint .'
export const lintTsc = 'tsc --noEmit'

export const lint = parallel(lintEslint, lintTsc)

export const check = [build, lint] // sequential

export const custom = async () => {
	console.log('custom script')
	return 'pnpm publish' // optional return
}
```

## CLI Usage

```sh
pnpm exec v [command]
```

...or - longer version:

```sh
pnpm exec voltiso-script [command]
```

The script is searched for in this order:

1. `package.json` scripts
2. `scripts.ts` file in the current directory
3. `scripts.ts` file in the parent directory, and so on

Even if the script is found in a directory above, the `cwd` does _NOT_ change.
This allows defining common scripts in a parent directory, instead of
duplicating them in every project.
