// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schemable,
	CustomUnknownObject,
	SimpleSchema,
} from '@voltiso/schemar.types'

import { UnknownObject } from '../unknownObject'

export function recordCall<
	TKeySchema extends $$Schemable,
	TValueSchema extends $$Schemable,
>(
	keySchema: TKeySchema,
	valueSchema: TValueSchema,
): CustomUnknownObject.Index<UnknownObject, TKeySchema, TValueSchema>

export function recordCall<TValueSchema extends $$Schemable>(
	valueSchema: TValueSchema,
): CustomUnknownObject.Index<
	UnknownObject,
	SimpleSchema<keyof any>,
	TValueSchema
>

export function recordCall(...args: any): any {
	return new UnknownObject().index(...(args as [any]))
}
