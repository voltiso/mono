// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeepReadonly } from '@voltiso/util'

import { deepMerge } from './_from-util/deepMerge'
import type { _FromUtil } from './_FromUtil'
import type { EslintConfig, EslintConfigOverride } from './EslintConfig'

export function defineEslintConfig<
	Config extends
		| DeepReadonly<EslintConfig>
		| _FromUtil.AlsoAccept<_FromUtil.PlainObject>,
>(config: Config): _FromUtil.DeepMutable_<Config>

export function defineEslintConfig<
	A extends EslintConfig | _FromUtil.AlsoAccept<_FromUtil.PlainObject>,
	B extends EslintConfig | _FromUtil.AlsoAccept<_FromUtil.PlainObject>,
>(configA: A, configB: B): _FromUtil.DeepMutable_<_FromUtil.Merge2_<A, B>>

export function defineEslintConfig<
	Configs extends (
		| EslintConfig
		| _FromUtil.AlsoAccept<_FromUtil.PlainObject>
	)[],
>(...configs: Configs): Record<string, unknown> {
	return deepMerge(...configs) as never
}

//

export function defineEslintConfigOverride<
	X extends EslintConfigOverride | _FromUtil.AlsoAccept<object>,
>(configOverride: X): _FromUtil.DeepMutable_<X> {
	return configOverride as never
}

export function defineEslintConfigOverrideRules<
	X extends EslintConfigOverride['rules'] | _FromUtil.AlsoAccept<object>,
>(configOverrideRules: X): _FromUtil.DeepMutable_<X> {
	return configOverrideRules as never
}
