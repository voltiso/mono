// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const sonar = {
	files: ['*'],

	// eslint-disable-next-line sort-keys-fix/sort-keys-fix
	extends: ['plugin:sonarjs/recommended'],
	plugins: ['sonarjs'],

	rules: {
		'sonarjs/cognitive-complexity': 'error',
		'sonarjs/elseif-without-else': 2,
		'sonarjs/no-identical-expressions': 'error',
		'sonarjs/no-inverted-boolean-check': 2,
	},
}
