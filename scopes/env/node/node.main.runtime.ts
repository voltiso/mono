import { MainRuntime } from '@teambit/cli'
import { NodeAspect, NodeMain } from '@teambit/node'
import { EnvsAspect, EnvsMain } from '@teambit/envs'
import { MyNodeAspect } from './node.aspect'
//import {
//  previewConfigTransformer,
//  devServerConfigTransformer
//} from './webpack/webpack-transformers';
import {
	devConfigTransformer,
	buildConfigTransformer,
} from './typescript/ts-transformers'
import { UseTypescriptModifiers } from '@teambit/react'

const tsModifiers: UseTypescriptModifiers = {
	devConfig: [devConfigTransformer],
	buildConfig: [buildConfigTransformer],
}

export class MyNodeMain {
	static slots = []

	static dependencies = [NodeAspect, EnvsAspect]

	static runtime = MainRuntime

	//const webpackModifiers: UseWebpackModifiers = {
	//  previewConfig: [previewConfigTransformer],
	//  devServerConfig: [devServerConfigTransformer],
	//};

	static async provider([node, envs]: [NodeMain, EnvsMain]) {
		const MyNodeEnv = node.compose([
			/**
			 * Uncomment to override the config files for TypeScript, Webpack or Jest
			 * Your config gets merged with the defaults
			 */

			node.useTypescript(tsModifiers), // note: this cannot be used in conjunction with node.overrideCompiler
			// node.useWebpack(webpackModifiers),
			// node.overrideJestConfig(require.resolve('./jest/jest.config')),

			/**
			 * override the ESLint default config here then check your files for lint errors
			 * @example
			 * bit lint
			 * bit lint --fix
			 */
			node.useEslint({
				transformers: [
					config => {
						config.setRule('no-console', ['error'])
						return config
					},
				],
			}),

			/**
			 * override the Prettier default config here the check your formatting
			 * @example
			 * bit format --check
			 * bit format
			 */
			node.usePrettier({
				transformers: [
					config => {
						config.setKey('tabWidth', 2)
						return config
					},
				],
			}),

			/**
			 * override dependencies here
			 * @example
			 * Uncomment types to include version 17.0.3 of the types package
			 */
			node.overrideDependencies({
				devDependencies: {
					// '@types/node': '16.11.7'
				},
			}),
		])
		envs.registerEnv(MyNodeEnv)
		return new MyNodeMain()
	}
}

MyNodeAspect.addRuntime(MyNodeMain)
