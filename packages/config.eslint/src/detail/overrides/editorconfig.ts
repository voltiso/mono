// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import editorConfigPlugin from 'eslint-plugin-editorconfig'

export const editorconfig = defineEslintFlatConfig({
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

		'editorconfig/indent': 0, // conflicts with prettier
	},
})
