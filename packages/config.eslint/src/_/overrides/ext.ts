// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line unicorn/prevent-abbreviations
export const extOverride = {
	files: ['*'],

	plugins: ['ext'],

	rules: {
		'ext/lines-between-object-properties': [
			'error',
			'always',
			{ exceptBetweenSingleLines: true },
		],
	},
}
