import * as path from 'path'
import {
	TsConfigTransformer,
	TypescriptConfigMutator,
} from '@teambit/typescript'

import { tsConfigBit } from './tsconfig.bit'

export const commonTransformer: TsConfigTransformer = (
	config: TypescriptConfigMutator
) => {
	const newConfig = config.addTypes([path.join(__dirname, 'styles.d.ts')])

	newConfig.setCompilerOptions({ lib: [] })

	newConfig.mergeTsConfig(tsConfigBit)
	// newConfig.setOutDir('not-working')
	// Some examples of other built in mutator functions:
	//newConfig.addExclude(['someExclude']);
	//newConfig.setCompileJs(true)
	return newConfig
}

/**
 * Transformation for the dev config only
 * @param config
 * @param context
 * @returns
 */
export const devConfigTransformer: TsConfigTransformer = (
	config: TypescriptConfigMutator
) => {
	const newConfig = commonTransformer(config, {})
	return newConfig
}

/**
 * Transformation for the build only
 * @param config
 * @param context
 * @returns
 */
export const buildConfigTransformer: TsConfigTransformer = (
	config: TypescriptConfigMutator
) => {
	const newConfig = commonTransformer(config, {})
	newConfig.mergeTsConfig(tsConfigBit)
	return newConfig
}
