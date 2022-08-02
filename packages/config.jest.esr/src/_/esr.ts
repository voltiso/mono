// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	codeFilesExtensions,
	defineJestConfig,
	moduleNameMapper,
} from '@voltiso/config.jest.lib'

//

const transform: Record<string, string> = {}

for (const extension of codeFilesExtensions) {
	transform[`\\.${extension}$`] =
		'./node_modules/@voltiso/config.jest.esr/dist/cjs/transform.js'
}

// const esLibs = ['get-port']

export const jestEsrConfig = defineJestConfig({
	testMatch: [
		'**/__tests__/**/*.?([cm])[jt]s?(x)',
		'**/?(*.)+(spec|test).?([cm])[tj]s?(x)',
	],

	// testEnvironment: 'node',
	modulePathIgnorePatterns: ['dist/', '.tsc-out/', '.next/'],

	// transformIgnorePatterns: [`node_modules/.*(?!${esLibs.join('|')})`],

	moduleNameMapper,
	transform,
} as const)
