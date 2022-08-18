// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'
import { isConstructor } from '@voltiso/util'

import type {
	Inferable_,
	InferableLiteral,
	InferableMutableTuple,
	InferableObject,
	InferableObject_,
	InferableReadonlyTuple,
	Instance,
	ISchema_,
	Literal,
	MutableTuple,
	Object,
	ReadonlyTuple,
	Schema,
	Schemable_,
} from '~'
import { isSchema } from '~'
import { instance, literal, object, tuple } from '~/custom-schemas'

export type GetSchema_<S> = [S] extends [InferableLiteral]
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

export type GetSchema<S extends Schemable_> = GetSchema_<S>

export type $GetSchema_<S> = S extends any ? GetSchema_<S> : never

export type $GetSchema<S extends Schemable_> = S extends any
	? GetSchema_<S>
	: never

//

export type GetSchemaWithoutReadonlyTuples_<T> = T extends InferableLiteral
	? Literal<T>
	: T extends Newable
	? Instance<T>
	: T extends ISchema_
	? T
	: T extends InferableReadonlyTuple
	? MutableTuple<[...T]>
	: T extends InferableObject_
	? // eslint-disable-next-line @typescript-eslint/ban-types
	  Object<T>
	: never

export type GetSchemaWithoutReadonlyTuples<T extends Schemable_> =
	GetSchemaWithoutReadonlyTuples_<T>

//

export function getSchema<T extends Inferable_>(
	t: T,
): GetSchemaWithoutReadonlyTuples<T>

export function getSchema<T extends ISchema_>(t: T): T

export function getSchema<T extends Schemable_>(
	t: T,
): GetSchemaWithoutReadonlyTuples<T>

export function getSchema<T extends Schemable_>(
	t: T,
): GetSchemaWithoutReadonlyTuples<T> {
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
