// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const filenames = {
	files: '*',

	plugins: ['filenames'],

	rules: {
		'filenames/match-regex': ['error', '^((\\..*|[A-Za-z0-9]+)+$)'],
		// 'filenames/match-exported': [2, 'kebab'],
	},
}
