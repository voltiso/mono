// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as path from 'node:path'

import baseConfig from '@voltiso/config.eslint'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

const project = [
	'tsconfig.json',
	//
	'packages/*/tsconfig.json',
	//
	'packages/styler/test/web/tsconfig.json',
	'packages/styler/test/web/tsc-options/*/tsconfig.json',
	//
	'packages/handler/test/tsc-options/*/test-true/tsconfig.json',
	'packages/handler/test/tsc-options/*/test-false/tsconfig.json',
	//
	'packages/schemar/test/tsc-options/*/test-true/tsconfig.json',
	'packages/schemar/test/tsc-options/*/test-false/tsconfig.json',
	//
	'packages/util/src/tsc-options/*/test-true/tsconfig.json',
	'packages/util/src/tsc-options/*/test-false/tsconfig.json',
]

// eslint-disable-next-line sonarjs/variable-name
const __dirname = path.dirname(new URL(import.meta.url).pathname)
// console.log('dirname', __dirname)

export default defineEslintFlatConfig(
	...baseConfig,
	// ...(isFastMode ? baseConfigFast : baseConfig),
	{
		// files: ['*.ts', '*.tsx'],

		languageOptions: {
			parserOptions: {
				project,
				tsconfigRootDir: __dirname,
			},
		},

		settings: {
			'import/resolver': {
				typescript: {
					project,
					tsconfigRootDir: __dirname,
				},
			},
		},
	},
)
