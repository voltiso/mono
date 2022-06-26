// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const switchCase = {
	files: ['*'],

	plugins: ['switch-case'],

	// eslint-disable-next-line sort-keys-fix/sort-keys-fix
	extends: ['plugin:switch-case/recommended'],

	rules: {
		'switch-case/newline-between-switch-case': 2,
		'switch-case/no-case-curly': 2,
	},
}
