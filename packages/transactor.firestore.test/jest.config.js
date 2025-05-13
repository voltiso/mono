// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import baseConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'
// import { registerEsbuild } from '@voltiso/util.esbuild'
// import { register as registerEsbuild } from 'esbuild-register/dist/node'

// // eslint-disable-next-line @typescript-eslint/prefer-optional-chain, unicorn/no-typeof-undefined
// const isEsm = typeof import.meta !== 'undefined' && import.meta.url

// registerEsbuild({
// 	target: `node${process.version.slice(1)}`,
// 	format: 'esm' // isEsm ? 'esm' : 'cjs',
// })

// registerEsbuild()

// // eslint-disable-next-line n/no-unsupported-features/node-builtins
// import { register as registerModule } from "node:module"
// import { pathToFileURL } from "node:url"
// registerModule("tsx", pathToFileURL("./"));
// // registerModule("esbuild-node-loader", pathToFileURL("./"));

// ! need to create a new unique object!
export default defineJestConfig({
	...baseConfig,

	testEnvironment: 'node',

	globalSetup: './jest/globalSetup.ts',
	globalTeardown: './jest/globalTeardown.ts',

	setupFilesAfterEnv: [
		...baseConfig.setupFilesAfterEnv,
		'./jest/setupAfterEnv.ts',
	],

	forceExit: true, // ! (have to, because jest-dev-server's `teardown` function causes always exit code 0 even on failed tests)
	detectOpenHandles: true,
})
