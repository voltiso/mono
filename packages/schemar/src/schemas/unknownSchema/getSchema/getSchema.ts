// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'
import { isConstructor, lazyValue } from '@voltiso/util'

import type {
	Inferable,
	InferableLiteral,
	InferableMutableTuple,
	InferableObject,
	InferableReadonlyTuple,
	Schema,
	Schemable,
} from '~'
import { isSchema } from '~'
import * as s from '~/schemas'

export type GetSchema_<S> = S extends InferableLiteral
	? s.Literal<S>
	: S extends Newable
	? s.Instance<S>
	: S extends Schema
	? S
	: S extends InferableMutableTuple
	? s.MutableTuple<S>
	: S extends InferableReadonlyTuple
	? s.ReadonlyTuple<[...S]>
	: S extends InferableObject
	? s.Object<S>
	: never

export type GetSchema<S extends Schemable> = GetSchema_<S>

export type GetSchema_NoReadonlyTuples_<T> = T extends InferableLiteral
	? s.Literal<T>
	: T extends Newable
	? s.Instance<T>
	: T extends Schema
	? T
	: T extends InferableReadonlyTuple
	? s.MutableTuple<[...T]>
	: T extends InferableObject
	? s.Object<T>
	: never

export type GetSchema_NoReadonlyTuples<T extends Schemable> =
	GetSchema_NoReadonlyTuples_<T>

function getSchema_<T extends Inferable>(t: T): GetSchema_NoReadonlyTuples<T>
function getSchema_<T extends Schema>(t: T): T

function getSchema_<T extends Schemable>(t: T): GetSchema_NoReadonlyTuples<T>

function getSchema_<T extends Schemable>(t: T): GetSchema_NoReadonlyTuples<T> {
	if (
		t === null ||
		['string', 'number', 'symbol', 'boolean', 'bigint', 'undefined'].includes(
			typeof t,
		)
	) {
		return s.literal(t as InferableLiteral) as never
	} else if (isSchema(t)) return t as never
	else if (isConstructor(t)) {
		return s.instance(t) as never
	} else if (Array.isArray(t)) return s.tuple(...t) as never
	else return s.object(t as never) as never
}

export type GetSchemaFunction = typeof getSchema_

export const getSchema: GetSchemaFunction = lazyValue(() => getSchema_)
