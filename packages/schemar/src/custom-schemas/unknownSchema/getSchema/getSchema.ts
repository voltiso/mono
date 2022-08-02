// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'
import { isConstructor } from '@voltiso/util'

import type {
	Inferable,
	InferableLiteral,
	InferableMutableTuple,
	InferableObject,
	InferableReadonlyTuple,
	Instance,
	Literal,
	MutableTuple,
	Object,
	ReadonlyTuple,
	Schema,
	Schemable,
} from '~'
import { isSchema } from '~'
import { instance, literal, object, tuple } from '~/custom-schemas'

export type GetSchema_<S> = S extends InferableLiteral
	? Literal<S>
	: S extends Newable
	? Instance<S>
	: S extends Schema
	? S
	: S extends InferableMutableTuple
	? MutableTuple<S>
	: S extends InferableReadonlyTuple
	? ReadonlyTuple<[...S]>
	: S extends InferableObject
	? // eslint-disable-next-line @typescript-eslint/ban-types
	  Object<S>
	: never

export type GetSchema<S extends Schemable> = GetSchema_<S>

export type GetSchema_NoReadonlyTuples_<T> = T extends InferableLiteral
	? Literal<T>
	: T extends Newable
	? Instance<T>
	: T extends Schema
	? T
	: T extends InferableReadonlyTuple
	? MutableTuple<[...T]>
	: T extends InferableObject
	? // eslint-disable-next-line @typescript-eslint/ban-types
	  Object<T>
	: never

export type GetSchema_NoReadonlyTuples<T extends Schemable> =
	GetSchema_NoReadonlyTuples_<T>

//

export function getSchema<T extends Inferable>(
	t: T,
): GetSchema_NoReadonlyTuples<T>
export function getSchema<T extends Schema>(t: T): T

export function getSchema<T extends Schemable>(
	t: T,
): GetSchema_NoReadonlyTuples<T>

export function getSchema<T extends Schemable>(
	t: T,
): GetSchema_NoReadonlyTuples<T> {
	if (
		t === null ||
		['string', 'number', 'symbol', 'boolean', 'bigint', 'undefined'].includes(
			typeof t,
		)
	) {
		return literal(t as InferableLiteral) as never
	} else if (isSchema(t)) return t as never
	else if (isConstructor(t)) {
		return instance(t) as never
	} else if (Array.isArray(t)) return tuple(...t) as never
	else return object(t as never) as never
}

export type GetSchemaFunction = typeof getSchema
