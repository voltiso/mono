// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'
// @ts-expect-error no typings
import editorConfigPlugin from 'eslint-plugin-editorconfig'

export const editorconfig: Linter.FlatConfig[] = [
	{
		// files: ['*'],

		// extends: ['plugin:editorconfig/all'],

		// plugins: ['editorconfig'],
		plugins: {
			editorconfig: editorConfigPlugin as never,
		},

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		rules: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			...editorConfigPlugin.configs.all.rules,
		},
	},
]
