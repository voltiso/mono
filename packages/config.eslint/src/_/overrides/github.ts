// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const githubOverride = {
	extends: [
		'plugin:github/recommended',
		'plugin:github/internal',
		'plugin:github/browser',
		'plugin:github/typescript',
	],

	files: ['*'],

	plugins: ['github'],
}
