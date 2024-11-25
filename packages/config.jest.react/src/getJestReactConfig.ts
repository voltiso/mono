// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable unicorn/prefer-module */

// import jestEsrConfig from '@voltiso/config.jest'
// import { defineJestConfig } from '@voltiso/config.jest.lib'

// export const jestReactConfig = defineJestConfig({
// 	...jestEsrConfig,

// 	testEnvironment: require.resolve('jest-environment-jsdom'), // 'jsdom',

// 	setupFilesAfterEnv: [
// 		...jestEsrConfig.setupFilesAfterEnv,
// 		require.resolve('./react-setup-after-env.js'),
// 		require.resolve('react-native/jest/setup'),
// 	],
// })

import * as path from 'node:path'

import { getJestConfig } from '@voltiso/config.jest'
import type { Config } from 'jest'
// import { setupFilesAfterEnv as baseSetupFilesAfterEnv } from '@voltiso/config.jest'
import resolve from 'resolve'

const dirname = __dirname // will be transpiled to `import.meta...` by `@voltiso/transform/compat

let reactNativeSetup: string | undefined

try {
	reactNativeSetup = resolve.sync('react-native/jest/setup', {
		basedir: '.',
		// basedir: dirname,
	})
} catch {}

//

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getJestReactConfig(options?: { format?: 'cjs' | 'esm' }) {
	const baseConfig = getJestConfig(options)

	const setupFilesAfterEnv = [
		...baseConfig.setupFilesAfterEnv,
		path.join(dirname, 'react-setup-after-env.js'),
		// 'react-native/jest/setup',
		// resolve.sync('react-native/jest/setup', { basedir: dirname }),
	]

	if (reactNativeSetup) setupFilesAfterEnv.push(reactNativeSetup)

	return {
		...baseConfig,

		...(reactNativeSetup
			? {
					injectGlobals: true, // react-native assumes globalThis.jest is available
				}
			: {}),

		testEnvironment: resolve.sync('jest-environment-jsdom', {
			basedir: dirname,
		}),

		setupFilesAfterEnv,
	} satisfies Config
}
