// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $fastAssert } from '@voltiso/util'

import type { Schema, Schema$ } from '~/types/Schema/ISchema'

export function isSchema(x: unknown): x is Schema$ {
	$fastAssert(SCHEMA_NAME)

	// console.log('isSchema', x, SCHEMA_NAME, x?.[SCHEMA_NAME])

	return !!(x as Schema | null)?.[SCHEMA_NAME]
}
