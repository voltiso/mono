// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as path from 'node:path'

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
import baseConfig from '@voltiso/eslint-config'
// import baseConfigFast from '@voltiso/eslint-config-fast'

const project = [
	'tsconfig.json',
	//
	'packages/*/tsconfig.json',
	//
	'packages/styler/test/native/tsconfig.json',
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

// eslint-disable-next-line n/no-process-env, turbo/no-undeclared-env-vars
// const isFastMode = !process.env['FULL']
// const isFastMode = false

// // eslint-disable-next-line no-console
// console.log(
// 	new Date().toISOString(),
// 	'eslint config:',
// 	isFastMode ? 'FAST' : 'FULL',
// )

// import config from '@voltiso/config.eslint'

// console.log('process.cwd', process.cwd())
// console.log('import.meta.url', import.meta.url)
// console.log('__dirname', __dirname)

// export default defineEslintFlatConfig({
// 	rules: {
// 		'no-console': 1
// 	}
// })

// eslint-disable-next-line es-x/no-import-meta
const dirname = path.dirname(new URL(import.meta.url).pathname)
// console.log('dirname', __dirname)

// eslint-disable-next-line import/no-default-export
export default defineEslintFlatConfig(
	...baseConfig,
	// ...(isFastMode ? baseConfigFast : baseConfig),
	{
		// files: ['*.ts', '*.tsx'],

		languageOptions: {
			parserOptions: {
				project,
				tsconfigRootDir: dirname,
			},
		},

		settings: {
			'import/resolver': {
				typescript: {
					project,
					tsconfigRootDir: dirname,
				},
			},
		},
	},
)
