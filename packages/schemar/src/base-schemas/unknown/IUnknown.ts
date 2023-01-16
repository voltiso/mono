// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $assert } from '@voltiso/util'

import type { ISchema, ISchema$ } from '~'

export interface IUnknown extends ISchema {
	readonly [SCHEMA_NAME]: 'Unknown'
}

/** Typeof s.unknown */
export interface IUnknown$ extends ISchema$ {
	readonly [SCHEMA_NAME]: 'Unknown'
}

export function isUnknownSchema(x: unknown): x is IUnknown {
	$assert(SCHEMA_NAME)
	return (x as IUnknown | null)?.[SCHEMA_NAME] === 'Unknown'
}
