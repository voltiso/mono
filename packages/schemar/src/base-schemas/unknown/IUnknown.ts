// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $fastAssert } from '@voltiso/util'

import type { Schema, Schema$ } from '~'

export interface IUnknown extends Schema {
	readonly [SCHEMA_NAME]: 'Unknown'
}

/** Typeof s.unknown */
export interface IUnknown$ extends Schema$ {
	readonly [SCHEMA_NAME]: 'Unknown'
}

export function isUnknownSchema(x: unknown): x is IUnknown {
	$fastAssert(SCHEMA_NAME)
	return (x as IUnknown | null)?.[SCHEMA_NAME] === 'Unknown'
}
