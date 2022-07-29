// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	AlsoAccept,
	DeepMutable,
	Merge,
	Merge2,
	PlainObject,
} from '@voltiso/util'
import { deepMerge } from '@voltiso/util'

import type { EslintConfig, EslintConfigOverride } from './EslintConfig'

export function defineEslintConfig<
	Config extends EslintConfig | AlsoAccept<PlainObject>,
>(config: Config): DeepMutable<Config>

export function defineEslintConfig<
	A extends EslintConfig | AlsoAccept<PlainObject>,
	B extends EslintConfig | AlsoAccept<PlainObject>,
>(configA: A, configB: B): DeepMutable<Merge2<A, B>>

export function defineEslintConfig<
	Configs extends (EslintConfig | AlsoAccept<PlainObject>)[],
>(...configs: Configs): DeepMutable<Merge<Configs>> {
	return deepMerge(...configs) as never
}

//

export function defineEslintConfigOverride<
	X extends EslintConfigOverride | AlsoAccept<object>,
>(configOverride: X): DeepMutable<X> {
	return configOverride as never
}

export function defineEslintConfigOverrideRules<
	X extends EslintConfigOverride['rules'] | AlsoAccept<object>,
>(configOverrideRules: X): DeepMutable<X> {
	return configOverrideRules as never
}
