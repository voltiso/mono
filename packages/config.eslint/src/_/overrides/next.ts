// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const next = defineEslintConfigOverride({
	files: ['*'],

	extends: [
		// 'next',
		// 'next/core-web-vitals',
		'plugin:@next/next/recommended',
		'plugin:@next/next/core-web-vitals',
		//
	],

	plugins: ['@next/eslint-plugin-next'],
})
