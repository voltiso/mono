// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const noUnsanitized = {
	extends: ['plugin:no-unsanitized/DOM'],

	files: ['*'],

	plugins: ['no-unsanitized'],

	rules: {
		'no-unsanitized/method': 'error',
		'no-unsanitized/property': 'error',
	},
}
