// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { codeFilesExtensions } from './codeFilesExtensions'

const moduleNameMapper: Record<string, string> = {
	// '~': '<rootDir>', // use built files
	'^~$': '<rootDir>/src',
	'^~/(.*)': '<rootDir>/src/$1',
	'^_$': '<rootDir>/src/_',
	'^_/(.*)': '<rootDir>/src/_/$1',
}

// remove extensions
for (const extension of codeFilesExtensions) {
	moduleNameMapper[`^(\\..+)\\.${extension}$`] = '$1'
}

export { moduleNameMapper }
