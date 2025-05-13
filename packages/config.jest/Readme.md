#

To use with ESM, run `jest` e.g. like this:

`NODE_OPTIONS=--experimental-vm-modules jest`

Or, additionally using `tsx` to handle TypeScript setup files (like
`setup-after-env`), and using per-project `jest` installation, plus `--silent`
flag:

`NODE_OPTIONS="--experimental-vm-modules --import tsx" pnpm jest --silent`

Note: if you only have TypeScript in the actual test/source files, this is
handled by `transformer` option instead.

# Example custom configuration

`jest.config.cjs`:

```js
const jestEsrConfig = require('@voltiso/config.jest')
const { defineJestConfig } = require('@voltiso/config.jest.lib')

//! need to create a new unique object!
module.exports = defineJestConfig({
	...jestEsrConfig,

	setupFilesAfterEnv: [
		...jestEsrConfig.setupFilesAfterEnv,
		'./jest/setupAfterEnv.ts', // our custom env setup file
		require.resolve('react-native/jest/setup'), // for `react-native` (see the note below)
	],

	moduleNameMapper: {
		...jestEsrConfig.moduleNameMapper,

		// '^@voltiso/([^/]*)$': '<rootDir>/node_modules/@voltiso/$1/src', // use source files from this mono-repo
		// '^@voltiso/([^/]*)(.*)$': '@voltiso/$1/src$2', // use source files from this mono-repo
	},
})
```

# React Native

React-native config for `jest` mocks a lot of stuff - notably global `Promise`
(uses `promise` library). This means it's not compatible with Node's
`AsyncLocalStorage`. Instead, `zone.js` can be used - but has to be installed
after, as it also patches the global `Promise` object.
