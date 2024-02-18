// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeepReadonly } from '@voltiso/util'

import type { AlsoAccept, DeepMutable_, PlainObject } from './_from-util/misc'
import type { EslintFlatConfig } from './EslintFlatConfig'

export type SingleFlatConfig =
	| DeepReadonly<EslintFlatConfig>
	| AlsoAccept<PlainObject>

//

export function defineEslintFlatConfig<Config extends SingleFlatConfig>(
	config: Config,
): DeepMutable_<Config>

export function defineEslintFlatConfig<
	Config extends readonly SingleFlatConfig[],
>(...config: Config): DeepMutable_<Config>

//

export function defineEslintFlatConfig<
	Config extends readonly SingleFlatConfig[],
>(...config: Config): DeepMutable_<Config> {
	return config
}
