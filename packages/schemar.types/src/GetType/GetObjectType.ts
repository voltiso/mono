// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_,
	Get_,
	HasIndexSignature,
	IsAlmostSame,
	OmitByValue_,
} from '@voltiso/util'

import type { $$Object, $$Schema, $$UnknownObject, SchemaOptions } from '~'

import type { GetTypeOptions, Type_ } from '.'
import type { GetOptions } from './GetOptions'

/** @inline */
export type _ObjectTypeNoSignature<
	T,
	Shape extends object,
	O extends Record<keyof T, SchemaOptions>,
	IO extends GetTypeOptions,
	// eslint-disable-next-line etc/no-internal
> = _IntersectWithObject<
	// eslint-disable-next-line etc/no-internal
	_ObjectTypeFinalize<
		{
			[k in keyof T as false extends O[k]['isReadonly']
				? _ObjectTypeIsOptional<O[k], IO, never, k>
				: never]: T[k]
		} & {
			[k in keyof T as false extends O[k]['isReadonly'] ? k : never]?: T[k]
		} & {
			readonly [k in keyof T as _ObjectTypeIsOptional<O[k], IO> extends false
				? k
				: never]: T[k]
		} & {
			readonly [k in keyof T]?: T[k]
		},
		Shape,
		IO
	>
>

/**
 * Types should actually be e.g. `object & { a: 1 }`, but it's too verbose
 *
 * @internal
 */
// export type _IntersectWithObject<T> = IsAlmostSame<T, {}> extends true
// 	? object
// 	: object & T
export type _IntersectWithObject<T> = IsAlmostSame<T, {}> extends true
	? object
	: T

/** @inline */
export type ObjectType_<
	Shape extends object,
	IO extends GetTypeOptions = { kind: 'out' },
> = HasIndexSignature<Shape> extends true
	? /* object & */ {
			[k in keyof Shape]: Type_<Shape[k], IO>
	  }
	: HasIndexSignature<Shape> extends false
	? _ObjectTypeNoSignature<
			{
				[k in keyof Shape]: Type_<Shape[k], IO>
			},
			Shape,
			{
				[k in keyof Shape]: GetOptions<Shape[k]>
			},
			IO
	  >
	: never

export type ImplicitObjectType_<
	Shape extends object,
	IO extends GetTypeOptions,
> = IO['kind'] extends 'in'
	? object extends ObjectType_<Shape, IO>
		? ObjectType_<Shape, IO> | undefined
		: ObjectType_<Shape, IO>
	: IO['kind'] extends 'out'
	? ObjectType_<Shape, IO>
	: never

/** @inline */
export type _ObjectTypeIsOptional<
	O extends SchemaOptions,
	IO extends GetTypeOptions,
	T = true,
	F = false,
> = O['isOptional'] extends true
	? T
	: O['isStrictOptional'] extends true
	? T
	: O['hasDefault'] extends false
	? // : [O['default']] extends [undefined]
	  F
	: IO['kind'] extends 'in'
	? T
	: IO['kind'] extends 'out'
	? F
	: never

/** @inline @internal */
export type _ShouldForceOptional<T, Shape> = Shape extends $$UnknownObject
	? false
	: Shape extends $$Object
	? false
	: Shape extends $$Schema
	? false
	: object extends T
	? true
	: false

/** @inline @internal */
export type _ObjectTypeFinalize<
	T extends object,
	Shape extends object,
	IO extends GetTypeOptions,
> = IO['kind'] extends 'in'
	? _<
			OmitByValue_<
				{
					// eslint-disable-next-line etc/no-internal
					[k in keyof T]: _ShouldForceOptional<
						T[k],
						Get_<Shape, k>
					> extends false
						? T[k]
						: never
				},
				never
			> &
				OmitByValue_<
					{
						// eslint-disable-next-line etc/no-internal
						[k in keyof T]?: _ShouldForceOptional<
							T[k],
							Get_<Shape, k>
						> extends true
							? T[k] | undefined
							: never
					},
					never
				>
	  >
	: IO['kind'] extends 'out'
	? _<T>
	: never
