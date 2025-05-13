// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import etc from 'eslint-plugin-etc'

import { codeFilesNoMd } from '../files'

export const etcConfig = defineEslintFlatConfig({
	// extends: ['plugin:etc/recommended'],

	// files: codeFiles,
	...codeFilesNoMd,

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	plugins: { etc },

	rules: {
		...getAllRules(etc as never, 'etc', 'warn'),

		'etc/no-internal': 0, // ! does not work with eslint 9

		'etc/no-assign-mutated-array': 0, // does not work with eslint 9
		'etc/no-deprecated': 0, // does not work with eslint 9
		'etc/no-foreach': 0, // does not work with eslint 9
		'etc/no-implicit-any-catch': 0, // does not work with eslint 9
		'etc/throw-error': 0, // does not work with eslint 9
		'etc/underscore-internal': 0, // does not work with eslint 9

		'etc/no-commented-out-code': 0,
		'etc/no-const-enum': 1,
		'etc/no-enum': 1,
		'etc/no-misused-generics': 0, // have to disable too often
		'etc/no-t': 0, // single-char type args
		'etc/prefer-interface': 0, // no - sometimes we want type so that it's assignable to an interface with an index signature

		// 'etc/prefer-less-than': 2,
		'etc/prefer-less-than': 0, // auto-fix not working properly!
		// 'disable-autofix/etc/prefer-less-than': 2,
	},
})
