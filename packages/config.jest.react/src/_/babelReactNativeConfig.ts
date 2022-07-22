// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineBabelConfig } from '@voltiso/config.babel.lib'

export const babelReactNativeConfig = defineBabelConfig(api => {
	api.cache.forever()

	return {
		presets: [
			// '@babel/preset-env',
			// ['@babel/preset-react', { runtime: 'automatic' }],
			[
				'module:metro-react-native-babel-preset',
				{ useTransformReactJSXExperimental: true },
			],
			// 'module:react-native-dotenv',
			// '@babel/preset-flow',
			//
		],

		plugins: [
			[
				'@babel/plugin-transform-react-jsx',
				{
					runtime: 'automatic',
				},
			],
			'@babel/plugin-transform-strict-mode',
			['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
		],
	} as const
})
