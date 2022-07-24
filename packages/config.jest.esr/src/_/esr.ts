// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineJestConfig } from '@voltiso/config.jest.lib'

const extensions = [
	'ts',
	'js',
	'cts',
	'cjs',
	'mts',
	'mjs',
	//
	'tsx',
	'jsx',
	'ctsx',
	'cjsx',
	'mtsx',
	'mjsx',
]

//

const transform: Record<string, string> = {}

for (const extension of extensions) {
	transform[`\\.${extension}$`] =
		'./node_modules/@voltiso/config.jest.esr/dist/cjs/transform.js'
}

//

const moduleNameMapper: Record<string, string> = {}

for (const extension of extensions) {
	moduleNameMapper[`^(\\..+)\\.${extension}$`] = '$1'
}

//

export const jestEsrConfig = defineJestConfig({
	testMatch: [
		'**/__tests__/**/*.?([cm])[jt]s?(x)',
		'**/?(*.)+(spec|test).?([cm])[tj]s?(x)',
	],

	// testEnvironment: 'node',
	modulePathIgnorePatterns: ['dist/', '.tsc-out/', '.next/'],

	moduleNameMapper,
	transform,
} as const)
