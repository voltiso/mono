// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { CustomUnknownObject } from '../unknownObject/CustomUnknownObject'
import type { UnknownObject } from '../unknownObject/UnknownObject'
import { object } from '../unknownObject/UnknownObject'

export function recordCall<
	TKeySchema extends $$Schemable,
	TValueSchema extends $$Schemable,
>(
	keySchema: TKeySchema,
	valueSchema: TValueSchema,
): CustomUnknownObject.Index<UnknownObject, TKeySchema, TValueSchema>

export function recordCall<TValueSchema extends $$Schemable>(
	valueSchema: TValueSchema,
): CustomUnknownObject.Index<UnknownObject, Schema<keyof any>, TValueSchema>

export function recordCall(...args: any): any {
	return object.index(...(args as [any]))
}
