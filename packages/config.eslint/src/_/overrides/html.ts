// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const html = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['html'],

	settings: {
		'html/indent': 'tab', // indentation is one tab at the beginning of the line.
	},
})
