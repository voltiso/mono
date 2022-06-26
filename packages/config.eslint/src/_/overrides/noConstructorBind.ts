// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const noConstructorBind = {
	files: ['*'],

	plugins: ['no-constructor-bind'],

	rules: {
		'no-constructor-bind/no-constructor-bind': 'error',
		'no-constructor-bind/no-constructor-state': 'error',
	},
}
