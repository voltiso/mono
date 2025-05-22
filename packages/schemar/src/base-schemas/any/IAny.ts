// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $fastAssert } from '@voltiso/util'

import type { $$Schema, AnyOptions, Schema } from '~'

$fastAssert(SCHEMA_NAME)

export interface $$Any extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Any'
}

export interface IAny extends $$Any, Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Any'

	readonly [Voltiso.BASE_OPTIONS]: AnyOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: AnyOptions.Default
}

export function isAnySchema(x: unknown): x is IAny {
	return (x as IAny | null)?.[SCHEMA_NAME] === 'Any'
}
