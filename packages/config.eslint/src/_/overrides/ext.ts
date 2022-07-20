// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable unicorn/prevent-abbreviations */
import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const extOverride = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['ext'],

	rules: {
		'ext/lines-between-object-properties': [
			'error',
			'always',
			{ exceptBetweenSingleLines: true },
		],
	},
})
