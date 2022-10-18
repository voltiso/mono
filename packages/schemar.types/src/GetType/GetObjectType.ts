// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_,
	GetProperty_,
	HasIndexSignature,
	OmitByValue_,
} from '@voltiso/util'

import type {
	ObjectLike,
	SchemaLike,
	SchemaOptions,
	UnknownObjectLike,
} from '~'

import type { GetTypeOptions, Type_ } from '.'
import type { GetOptions } from './GetOptions'

/** @inline */
export type _ObjectTypeNoSignature<
	T,
	Shape extends object,
	O extends Record<keyof T, SchemaOptions>,
	IO extends GetTypeOptions,
	// eslint-disable-next-line etc/no-internal
> = _ObjectTypeFinalize<
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

/** @inline */
export type ObjectType_<
	T extends object,
	IO extends GetTypeOptions = { kind: 'out' },
> = HasIndexSignature<T> extends true
	? {
			[k in keyof T]: Type_<T[k], IO>
	  }
	: HasIndexSignature<T> extends false
	? _ObjectTypeNoSignature<
			{
				[k in keyof T]: Type_<T[k], IO>
			},
			T,
			{
				[k in keyof T]: GetOptions<T[k]>
			},
			IO
	  >
	: never

export type ImplicitObjectType_<
	T extends object,
	IO extends GetTypeOptions,
> = IO['kind'] extends 'in'
	? object extends ObjectType_<T, IO>
		? ObjectType_<T, IO> | undefined
		: ObjectType_<T, IO>
	: IO['kind'] extends 'out'
	? ObjectType_<T, IO>
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
export type _ShouldForceOptional<T, Shape> = Shape extends UnknownObjectLike
	? false
	: Shape extends ObjectLike
	? false
	: Shape extends SchemaLike
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
						GetProperty_<Shape, k>
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
							GetProperty_<Shape, k>
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
