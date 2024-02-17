// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverride,
	defineEslintFlatConfig,
} from '@voltiso/config.eslint.lib'

import { filesInsideMd } from '~/detail/files'

// @ts-expect-error no typings
import noticePlugin from 'eslint-plugin-notice'

const year = 2_024

const lines = [
	`⠀ⓥ ${year}     🌩    🌩     ⠀   ⠀`,
	`⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀`,
]

const commentLines = lines.map(line => `// ${line}`)
const hashCommentLines = lines.map(line => `# ${line}`)

export const notice = defineEslintFlatConfig({
	// files: '*',
	ignores: filesInsideMd,

	// plugins: ['notice'],
	plugins: { notice: noticePlugin },

	rules: {
		'notice/notice': [
			'warn',
			{
				mustMatch: `ⓥ ${year}`,
				template: `${commentLines.join('\n')}\n\n`,
			},
		],
	},
} as const)

export const noticeHash = defineEslintConfigOverride({
	files: [
		'*.yml',
		'*.yaml',
		'.editorconfig',
		'.npmrc',
		'.gitignore',
		'.prettierignore',
	],

	rules: {
		'notice/notice': [
			'warn',
			{
				mustMatch: `ⓥ ${year}`,
				template: `${hashCommentLines.join('\n')}\n\n`,
			},
		],
	},
} as const)
