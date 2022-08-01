// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { type BASE_OPTIONS, type DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { AnyOptions, DefaultAnyOptions, ISchema } from '~'

export interface IAny extends ISchema {
	readonly [SCHEMA_NAME]: 'Any'

	readonly [BASE_OPTIONS]: AnyOptions
	readonly [DEFAULT_OPTIONS]: DefaultAnyOptions
}

export function isAny(x: unknown): x is IAny {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IAny | null)?.[SCHEMA_NAME] === 'Any'
}
