// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const sortClassMembers = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['sort-class-members'],

	rules: {
		'sort-class-members/sort-class-members': 2,

		// 'sort-class-members/sort-class-members': [
		// 	2,
		// 	{
		// 		order: [
		// 			'[static-properties]',
		// 			'[static-methods]',
		// 			'[properties]',
		// 			'[conventional-private-properties]',
		// 			'constructor',
		// 			'[methods]',
		// 			'[conventional-private-methods]',
		// 		],
		// 		accessorPairPositioning: 'getThenSet',
		// 	},
		// ],
	},
})
