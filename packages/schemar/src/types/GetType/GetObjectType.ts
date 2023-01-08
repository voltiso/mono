// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_,
	Assume,
	exactOptionalPropertyTypes,
	Get_,
	HasIndexSignature,
	IsAlmostSame,
	OmitByValue_,
	Override,
} from '@voltiso/util'

import type { $$Schema, DefaultGetTypeOptions, GetTypeOptions, Type_ } from '~'

//

export interface _GetObjectTypeRequiredOptions {
	readonly isReadonly: boolean
	readonly isOptional: boolean
	readonly isStrictOptional: boolean
	readonly hasDefault: boolean
}

/** @internal */
export type _GetOptions<X> = Assume<
	_GetObjectTypeRequiredOptions,
	Override<
		{
			isReadonly: false
			isOptional: false
			isStrictOptional: false
			hasDefault: false
		},
		X
	>
>

/** @inline */
export type GetObjectType<
	Shape extends object,
	PartialOptions extends Partial<GetTypeOptions> = {},
> = HasIndexSignature<Shape> extends true
	? /* object & */ {
			[k in keyof Shape]: Type_<Shape[k], PartialOptions>
	  }
	: HasIndexSignature<Shape> extends false
	? GetObjectType._GetNoSignature<
			{
				[k in keyof Shape]: Type_<Shape[k], PartialOptions>
			},
			Shape,
			{
				// eslint-disable-next-line etc/no-internal
				[k in keyof Shape]: _GetOptions<Shape[k]>
			},
			Override<DefaultGetTypeOptions, PartialOptions>
	  >
	: never

export type GetImplicitObjectType<
	Shape extends object,
	IO extends GetTypeOptions,
> = IO['kind'] extends 'in'
	? object extends GetObjectType<Shape, IO>
		? GetObjectType<Shape, IO> | undefined
		: GetObjectType<Shape, IO>
	: IO['kind'] extends 'out'
	? GetObjectType<Shape, IO>
	: never

//

//

//

export namespace GetObjectType {
	/** @inline @inline */
	export type _GetNoSignature<
		T,
		Shape extends object,
		O extends Record<keyof T, _GetObjectTypeRequiredOptions>,
		Options extends GetTypeOptions,
		// eslint-disable-next-line etc/no-internal
	> = _MaybeIntersectWithObject<
		// eslint-disable-next-line etc/no-internal
		GetObjectType._Finalize<
			{
				[k in keyof T as false extends O[k]['isReadonly']
					? // eslint-disable-next-line etc/no-internal
					  _IsOptional<O[k], Options, never, k>
					: never]: T[k]
			} & {
				[k in keyof T as false extends O[k]['isReadonly'] ? k : never]?: T[k]
			} & {
				readonly // eslint-disable-next-line etc/no-internal
				[k in keyof T as _IsOptional<O[k], Options> extends false
					? k
					: never]: T[k]
			} & {
				readonly [k in keyof T]?: T[k]
			},
			Shape,
			Options
		>,
		Options
	>

	//

	/** @internal @inline */
	export type _IsOptional<
		O extends _GetObjectTypeRequiredOptions,
		IO extends GetTypeOptions,
		T = true,
		F = false,
	> = O['isOptional'] extends true
		? T
		: O['isStrictOptional'] extends true
		? T
		: O['hasDefault'] extends false
		? F
		: IO['kind'] extends 'in'
		? T
		: IO['kind'] extends 'out'
		? F
		: never

	/** @inline @internal */
	export type _ShouldForceOptional<T, Shape> = Shape extends $$Schema
		? false
		: object extends T
		? true
		: false

	/** @inline @internal */
	export type _Finalize<
		T extends object,
		Shape extends object,
		IO extends GetTypeOptions,
	> = IO['kind'] extends 'in'
		? _<
				OmitByValue_<
					{
						// eslint-disable-next-line etc/no-internal
						[k in keyof T]: GetObjectType._ShouldForceOptional<
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
							[k in keyof T]?: GetObjectType._ShouldForceOptional<
								T[k],
								Get_<Shape, k>
							> extends true
								? T[k] | undefined
								: never
						},
						exactOptionalPropertyTypes extends true ? never : undefined
					>
		  >
		: IO['kind'] extends 'out'
		? _<T>
		: never

	/**
	 * Types should actually be e.g. `object & { a: 1 }`, but it's too verbose
	 *
	 * - We elect to mark object typed with `object` explicitly if `isPlain` is set
	 *
	 * @internal @inline
	 */
	export type _MaybeIntersectWithObject<
		T,
		Options extends GetTypeOptions,
		// eslint-disable-next-line etc/no-internal
	> = Options['isPlain'] extends true ? _IntersectWithObject<T> : T

	/** @internal @inline */
	export type _IntersectWithObject<T> = IsAlmostSame<T, {}> extends true
		? object
		: object & T
}
