// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { codeFiles } from '../files.js'

export const etcOverride = {
	extends: ['plugin:etc/recommended'],

	files: codeFiles,

	plugins: ['etc'],

	rules: {
		'etc/no-assign-mutated-array': 2,
		'etc/no-commented-out-code': 0,
		'etc/no-const-enum': 2,
		'etc/no-deprecated': 2,
		'etc/no-enum': 2,
		'etc/no-implicit-any-catch': 2,
		'etc/no-internal': 2,
		'etc/no-misused-generics': 2,
		'etc/no-t': 2,
		'etc/prefer-interface': 2,
		'etc/prefer-less-than': 2,
		'etc/throw-error': 2,
		'etc/underscore-internal': 2,
	},
}
