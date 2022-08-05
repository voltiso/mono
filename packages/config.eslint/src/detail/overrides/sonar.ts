// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const sonar = defineEslintConfigOverride({
	files: ['*'],

	extends: ['plugin:sonarjs/recommended'],
	plugins: ['sonarjs'],

	rules: {
		'sonarjs/cognitive-complexity': 0, // hmm, may be useful
		'sonarjs/elseif-without-else': 0,
		'sonarjs/no-identical-expressions': 1,
		'sonarjs/no-inverted-boolean-check': 1,
		'sonarjs/prefer-single-boolean-return': 0,
	},
} as const)
