// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'
// @ts-expect-error no typings
import etc from 'eslint-plugin-etc'

import { codeFilesNoMd } from '../files'

export const etcConfig: Linter.FlatConfig[] = [
	{
		// extends: ['plugin:etc/recommended'],

		// files: codeFiles,
		...codeFilesNoMd,

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		plugins: { etc },

		rules: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			...etc.configs.recommended.rules as {},

			'etc/no-assign-mutated-array': 1,
			'etc/no-commented-out-code': 0,
			'etc/no-const-enum': 1,
			'etc/no-deprecated': 1,
			'etc/no-enum': 1,
			'etc/no-implicit-any-catch': 1,
			'etc/no-internal': 1,
			'etc/no-misused-generics': 0, // have to disable too often
			'etc/no-t': 0, // single-char type args
			'etc/prefer-interface': 0, // no - sometimes we want type so that it's assignable to an interface with an index signature

			// 'etc/prefer-less-than': 2,
			'etc/prefer-less-than': 0, // auto-fix not working properly!
			// 'disable-autofix/etc/prefer-less-than': 2,

			'etc/throw-error': 1,
			'etc/underscore-internal': 1,
		},
	},
]
