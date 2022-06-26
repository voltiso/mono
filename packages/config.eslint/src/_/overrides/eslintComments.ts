// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const eslintComments = {
	files: ['*'],

	// eslint-disable-next-line sort-keys-fix/sort-keys-fix
	extends: ['plugin:eslint-comments/recommended'],

	plugins: ['eslint-comments'],

	rules: {
		'eslint-comments/disable-enable-pair': 0,
		'eslint-comments/no-unused-disable': 'error',
		'eslint-comments/no-use': 0,
	},
}
