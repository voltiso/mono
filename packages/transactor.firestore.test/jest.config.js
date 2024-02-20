// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as baseConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'
// import { registerEsbuild } from '@voltiso/util.esbuild'

// registerEsbuild({
// 	target: `node${process.version.slice(1)}`,
// })

//! need to create a new unique object!
export default defineJestConfig({
	...baseConfig,
	testEnvironment: 'node',

	globalSetup: './jest/globalSetup.ts',
	globalTeardown: './jest/globalTeardown.ts',

	setupFilesAfterEnv: [
		...baseConfig.setupFilesAfterEnv,
		'./jest/setupAfterEnv.ts',
	],

	// forceExit: true, //! (have to, because jest-dev-server's `teardown` function causes always exit code 0 even on failed tests)
	detectOpenHandles: true,
})
