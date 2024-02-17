// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import editorConfigPlugin from 'eslint-plugin-editorconfig'

export const editorconfig = defineEslintFlatConfig(
	editorConfigPlugin.configs.all,
	{
		// files: ['*'],

		// extends: ['plugin:editorconfig/all'],

		// plugins: ['editorconfig'],
		plugins: {
			editorconfig: editorConfigPlugin,
		},
	} as const,
)
