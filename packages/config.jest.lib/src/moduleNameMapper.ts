// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable github/unescaped-html-literal */

import { codeFilesExtensions } from './codeFilesExtensions'

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
for (const extension of codeFilesExtensions) {
	moduleNameMapper[`^(\\..+)\\.${extension}$`] = '$1'
}

export { moduleNameMapper }
