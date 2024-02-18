// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// import { codeFiles } from '~/_/files'
// @ts-expect-error no typings
import github from 'eslint-plugin-github'

export const githubOverride = defineEslintFlatConfig({
	// extends: [
	// 	'plugin:github/recommended',
	// 	'plugin:github/internal',
	// 	'plugin:github/browser',
	// 	'plugin:github/typescript',
	// ],

	// files: '*',
	// files: codeFiles,

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	plugins: { github },

	rules: {
		...Object.fromEntries(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			Object.keys(github.rules).map(rule => [`github/${rule}`, 'warn']),
		),

		'github/no-then': 0, // handled by `promise`
	},
})
