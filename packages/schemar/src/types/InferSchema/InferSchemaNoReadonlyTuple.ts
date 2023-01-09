// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAlmostSame, Newable } from '@voltiso/util'

import type {
	$$InferableObject,
	$$Schemable,
	InferableLiteral,
	InferableReadonlyTuple,
	Instance,
	Literal,
	MutableTuple,
	NonNullish,
	Object,
} from '~'

import type { $$Schema } from '../Schema'

export type InferSchemaNoReadonlyTuple_<T> = T extends InferableLiteral
	? Literal<T>
	: T extends Newable
	? Instance<T>
	: T extends $$Schema
	? T
	: T extends InferableReadonlyTuple
	? MutableTuple<[...T]>
	: IsAlmostSame<T, {}> extends true
	? NonNullish
	: T extends $$InferableObject
	? // eslint-disable-next-line @typescript-eslint/ban-types
	  Object<{ -readonly [k in keyof T]: T[k] }>
	: never

export type InferSchemaNoReadonlyTuple<T extends $$Schemable> =
	InferSchemaNoReadonlyTuple_<T>
