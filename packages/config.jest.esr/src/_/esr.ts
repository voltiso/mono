// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable github/unescaped-html-literal */

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

const moduleNameMapper: Record<string, string> = {
	// '~': '<rootDir>', // use built files
	'^~$': '<rootDir>/src',
	'^~/(.*)': '<rootDir>/src/$1',
	'^_$': '<rootDir>/src/_',
	'^_/(.*)': '<rootDir>/src/_/$1',
	// '#ansi-styles': './node_modules/chalk/source/vendor/ansi-styles/index.js', // for chalk
	// '#supports-color': './node_modules/chalk/source/vendor/supports-color/index.js', // for chalk
}

// remove extensions
for (const extension of extensions) {
	moduleNameMapper[`^(\\..+)\\.${extension}$`] = '$1'
}

//

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
