export const notice = {
	files: '*',

	plugins: ['notice'],

	rules: {
		'notice/notice': [
			'error',
			{
				mustMatch: '2022',
				template: `// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

`,
			},
		],
	},
}
