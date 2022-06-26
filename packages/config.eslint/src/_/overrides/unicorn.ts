// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const unicorn = {
	extends: ['plugin:unicorn/all'],

	files: '*',

	plugins: ['unicorn'],

	rules: {
		'unicorn/filename-case': [
			'error',
			{ cases: { camelCase: true, pascalCase: true } },
		],
	},
}
