// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'

import type { Instance, Literal, MutableTuple, Object } from '~/custom-schemas'
import type {
	$$InferableObject,
	InferableLiteral,
	InferableReadonlyTuple,
} from '~/Inferable'
import type { $$Schema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

export type InferSchemaNoReadonlyTuple_<T> = T extends InferableLiteral
	? Literal<T>
	: T extends Newable
	? Instance<T>
	: T extends $$Schema
	? T
	: T extends InferableReadonlyTuple
	? MutableTuple<[...T]>
	: T extends $$InferableObject
	? // eslint-disable-next-line @typescript-eslint/ban-types
	  Object<{ -readonly [k in keyof T]: T[k] }>
	: never

export type InferSchemaNoReadonlyTuple<T extends $$Schemable> =
	InferSchemaNoReadonlyTuple_<T>
