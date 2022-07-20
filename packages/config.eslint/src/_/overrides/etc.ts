// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFilesNoMd } from '../files.js'

export const etcOverride = defineEslintConfigOverride({
	extends: ['plugin:etc/recommended'],

	// files: codeFiles,
	...codeFilesNoMd,

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
		'etc/no-t': 0, // single-char type args
		'etc/prefer-interface': 0, // no - sometimes we want type so that it's assignable to an interface with an index signature

		// 'etc/prefer-less-than': 2,
		'etc/prefer-less-than': 0, // auto-fix not working properly!
		// 'disable-autofix/etc/prefer-less-than': 2,

		'etc/throw-error': 2,
		'etc/underscore-internal': 2,
	},
})
