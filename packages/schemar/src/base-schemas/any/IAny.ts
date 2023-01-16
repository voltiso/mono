// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { $$Schema, AnyOptions, ISchema } from '~'

export interface $$Any extends $$Schema {
	readonly [SCHEMA_NAME]: 'Any'
}

export interface IAny extends $$Any, ISchema {
	readonly [SCHEMA_NAME]: 'Any'

	readonly [BASE_OPTIONS]: AnyOptions
	readonly [DEFAULT_OPTIONS]: AnyOptions.Default
}

export function isAnySchema(x: unknown): x is IAny {
	 
	return (x as IAny | null)?.[SCHEMA_NAME] === 'Any'
}
