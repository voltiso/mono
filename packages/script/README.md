# `@voltiso/script`

CLI wrapper for `@voltiso/script.lib`

# Use in _YOUR_ project

_FIRST_, follow steps
[HERE](https://github.com/voltiso/util#use-in-your-project)

### After you have your PAT in `~/.npmrc`:

```sh
pnpm add -D $(@voltiso/script)
```

## CLI Usage

```sh
pnpm exec v [command]
```

...or - longer version:

```sh
pnpm exec voltiso-script [command]
```

# NPM scripts

Easy to use with [`npm-run-all`](https://www.npmjs.com/package/npm-run-all)

## Add to `package.json`:

```json
{
	// ...
	"scripts": {
		// ...
		"build": "run-p build:cjs build:esm 'v compatDirs write'"
	}
}
```

# Code _THIS_ project

## Build

NOTE: This package doesn't export anything - it's just the `voltiso-script`
binary - so we only do `cjs` build (no `esm`)
