// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import noticePlugin from 'eslint-plugin-notice'

import { codeFiles, filesInsideMd } from '~/detail/files'

const year = 2_024

const lines = [
	`⠀ⓥ ${year}     🌩    🌩     ⠀   ⠀`,
	`⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀`,
]

const commentLines = lines.map(line => `// ${line}`)
const hashCommentLines = lines.map(line => `# ${line}`)

export const notice = defineEslintFlatConfig({
	files: codeFiles,
	ignores: filesInsideMd,

	plugins: { notice: noticePlugin as never },

	rules: {
		'notice/notice': [
			'warn',
			{
				mustMatch: `ⓥ ${year}`,
				template: `${commentLines.join('\n')}\n\n`,
			},
		],
	},
})

export const noticeHash = defineEslintFlatConfig({
	files: [
		'**/*.yml',
		'**/*.yaml',
		'**/.editorconfig',
		'**/.npmrc',
		'**/.*ignore',
	],

	plugins: { notice: noticePlugin as never },

	rules: {
		'notice/notice': [
			'warn',
			{
				mustMatch: `ⓥ ${year}`,
				template: `${hashCommentLines.join('\n')}\n\n`,
			},
		],
	},
})
