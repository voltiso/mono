// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineBabelConfig } from '@voltiso/config.babel.lib'

export const babelZoneConfig = defineBabelConfig({
	plugins: ['@babel/plugin-transform-async-to-generator'], // to make zone.js work

	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
	],
} as const)
