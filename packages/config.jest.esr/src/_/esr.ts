// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineJestConfig } from '@voltiso/config.jest.lib'

export const jestEsrConfig = defineJestConfig({
	// testEnvironment: 'node',
	modulePathIgnorePatterns: ['dist/', '.tsc-out/', '.next/'],

	moduleNameMapper: {
		'^(\\..+)\\.js$': '$1',
	},

	transform: {
		'\\.ts$': '@voltiso/config.jest.esr/dist/cjs/transform.js',
	},
} as const)
