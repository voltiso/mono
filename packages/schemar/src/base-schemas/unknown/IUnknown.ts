// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $assert } from '@voltiso/util'

import type { ISchema } from '~'

/** Typeof s.unknown */
export interface IUnknown extends ISchema {
	readonly [SCHEMA_NAME]: 'Unknown'
}

export function isUnknownSchema(x: unknown): x is IUnknown {
	$assert(SCHEMA_NAME)
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknown | null)?.[SCHEMA_NAME] === 'Unknown'
}
