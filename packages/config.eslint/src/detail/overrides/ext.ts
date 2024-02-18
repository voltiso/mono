// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import ext from 'eslint-plugin-ext'

import { codeFiles } from '../files'

export const extOverride = defineEslintFlatConfig({
	files: codeFiles,

	plugins: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		ext,
	},

	rules: {
		'ext/lines-between-object-properties': [
			'warn',
			'always',
			{ exceptBetweenSingleLines: true },
		],
	},
})
