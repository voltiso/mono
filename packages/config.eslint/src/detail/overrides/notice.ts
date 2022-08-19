// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { filesInsideMd } from '~/detail/files'

export const notice = defineEslintConfigOverride({
	files: '*',
	excludedFiles: filesInsideMd,

	plugins: ['notice'],

	rules: {
		'notice/notice': [
			'warn',
			{
				mustMatch: '2022',
				template: `// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

`,
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
				mustMatch: 'ⓥ 2022',
				template: `# ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
# ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

`,
			},
		],
	},
} as const)
