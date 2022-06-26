// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const prettierOverride = {
	files: ['*'],

	plugins: ['prettier'],

	// eslint-disable-next-line sort-keys-fix/sort-keys-fix
	extends: ['plugin:prettier/recommended'],

	rules: {
		'prettier/prettier': 'error',
	},
}
