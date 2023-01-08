// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeepReadonly } from '@voltiso/util'

import { deepMerge } from './_from-util/deepMerge'
import type {
	AlsoAccept,
	DeepMutable_,
	Merge2_,
	PlainObject,
} from './_from-util/misc'
import type { EslintConfig, EslintConfigOverride } from './EslintConfig'

export function defineEslintConfig<
	Config extends DeepReadonly<EslintConfig> | AlsoAccept<PlainObject>,
>(config: Config): DeepMutable_<Config>

export function defineEslintConfig<
	A extends EslintConfig | AlsoAccept<PlainObject>,
	B extends EslintConfig | AlsoAccept<PlainObject>,
>(configA: A, configB: B): DeepMutable_<Merge2_<A, B>>

export function defineEslintConfig<
	Configs extends (EslintConfig | AlsoAccept<PlainObject>)[],
>(...configs: Configs) {
	return deepMerge(...configs) as never
}

//

export function defineEslintConfigOverride<
	X extends EslintConfigOverride | AlsoAccept<object>,
>(configOverride: X): DeepMutable_<X> {
	return configOverride as never
}

export function defineEslintConfigOverrideRules<
	X extends EslintConfigOverride['rules'] | AlsoAccept<object>,
>(configOverrideRules: X): DeepMutable_<X> {
	return configOverrideRules as never
}
