// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const next = {
	files: ['*'],

	// eslint-disable-next-line sort-keys-fix/sort-keys-fix
	extends: [
		// 'next',
		// 'next/core-web-vitals',
		'plugin:@next/next/recommended',
		'plugin:@next/next/core-web-vitals',
		//
	],

	plugins: ['@next/eslint-plugin-next'],
}
