// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_GetUnknownObjectIndex,
	SchemableLike,
	SimpleSchema,
} from '@voltiso/schemar.types'

import { UnknownObject } from '..'

export function recordCall<
	TKeySchema extends SchemableLike,
	TValueSchema extends SchemableLike,
>(
	keySchema: TKeySchema,
	valueSchema: TValueSchema,
): _GetUnknownObjectIndex<UnknownObject, TKeySchema, TValueSchema>

export function recordCall<TValueSchema extends SchemableLike>(
	valueSchema: TValueSchema,
): _GetUnknownObjectIndex<UnknownObject, SimpleSchema<keyof any>, TValueSchema>

export function recordCall(...args: any): any {
	return new UnknownObject().index(...(args as [any]))
}
