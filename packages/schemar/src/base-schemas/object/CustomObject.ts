// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_,
	$Override_,
	AlsoAccept,
	BASE_OPTIONS,
	DeepNonStrictPartial_,
	DeepPartial_,
	DEFAULT_OPTIONS,
	IsCompatible,
	NonStrictPartial_,
	OPTIONS,
} from '@voltiso/util'

import type {
	$$Object,
	$$Schemable,
	CustomSchema,
	CustomSchema$,
	Inferable,
	InferableObject,
	InferableTuple,
	Schema,
	SCHEMA_NAME,
	Type,
} from '~'

import type { ObjectIndexSignatureEntry, ObjectOptions } from './ObjectOptions'

//

export interface CustomObject<O extends Partial<ObjectOptions>>
	extends $$Object,
		CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Object'

	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: ObjectOptions.Default

	//

	get isPlain(): this[OPTIONS]['isPlain']

	/** Currently not type-exposed */
	get getIndexSignatures(): ObjectIndexSignatureEntry[] // this[OPTIONS]['indexSignatures']

	//

	get getShape(): _<CustomObject.GetShape<this>>

	get getDeepShape(): _<
		CustomObject.GetDeepShape<this['Output'], this['Input']>
	>
}

//

export interface CustomObject$<O extends Partial<ObjectOptions>>
	extends $$Object,
		CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Object'

	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: ObjectOptions.Default

	//

	get isPlain(): this[OPTIONS]['isPlain']

	/** Currently not type-exposed */
	get getIndexSignatures(): ObjectIndexSignatureEntry[] // this[OPTIONS]['indexSignatures']

	//

	get getShape(): _<CustomObject.GetShape<this>>

	get getDeepShape(): _<
		CustomObject.GetDeepShape<this['Output'], this['Input']>
	>

	//

	get Final(): CustomObject<O>

	//

	get plain(): this // CustomObject$<$Override<O, { isPlain: true }>>

	/**
	 * Apply `.optional` to all properties
	 *
	 * - Similar to TypeScript's `Partial`
	 */
	get partial(): CustomObject.WithPartial<this, O>

	/** Apply `.strictPartial` to all properties */
	get strictPartial(): CustomObject.WithStrictPartial<this, O>

	/**
	 * Similar to `.partial`, but applied recursively
	 *
	 * - Note: removes any nested defaults
	 */
	get deepPartial(): CustomObject.WithDeepPartial<this, O>

	/**
	 * Similar to `.deepPartial`, but applied recursively
	 *
	 * - Note: removes any nested defaults
	 */
	get deepStrictPartial(): CustomObject.WithDeepStrictPartial<this, O>

	index<TKeySchema extends $$Schemable, TValueSchema extends $$Schemable>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): CustomObject.WithIndex<this, O, TKeySchema, TValueSchema>

	index<TValueSchema extends $$Schemable>(
		valueSchema: TValueSchema,
	): CustomObject.WithIndex<this, O, Schema<keyof any>, TValueSchema>
}

//

// export type GetOptionsDiff<Base, Override> = Pick<
// 	Override,
// 	{
// 		[k in keyof Override]: k extends keyof Base
// 			? IsCompatible<Override[k], Base[k]> extends true
// 				? never
// 				: k
// 			: never
// 	}[keyof Override]
// >

export declare namespace CustomObject {
	export type Define<O, OO> = CustomObject$<$Override_<O, OO>>

	export type WithIndex<
		This extends $$Object,
		O,
		TKeySchema extends $$Schemable,
		TValueSchema extends $$Schemable,
	> = This extends { [OPTIONS]: ObjectOptions }
		? Define<
				O,
				{
					Output: _<
						This[OPTIONS]['Output'] & {
							[k in Type<TKeySchema> & keyof any]: Type<TValueSchema>
							// | This[OPTIONS]['Output'][Type<TKeySchema> &
							// 		keyof This[OPTIONS]['Output']]
						}
					>
					Input: _<
						This[OPTIONS]['Input'] & {
							[k in Type<TKeySchema> & keyof any]:
								| Type<TValueSchema>
								| AlsoAccept<unknown> // ! dirty - but need to make sure index matched all explicit fields without too long types
							// | This[OPTIONS]['Input'][Type<TKeySchema> &
							// 		keyof This[OPTIONS]['Input']]
						}
					>
				}
			>
		: never

	export type WithPartial<This extends $$Object, O> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? Define<
				O,
				{
					// shape: PartialShape_<This[OPTIONS]['shape']>
					Output: Partial<This[OPTIONS]['Output']>
					Input: NonStrictPartial_<This[OPTIONS]['Input']>
				}
			>
		: never

	export type WithStrictPartial<This extends $$Object, O> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? Define<
				O,
				{
					// shape: StrictPartialShape_<This[OPTIONS]['shape']>
					Output: Partial<This[OPTIONS]['Output']>
					Input: Partial<This[OPTIONS]['Input']>
				}
			>
		: never

	//

	export type WithDeepPartial<This extends $$Object, O> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? Define<
				O,
				{
					// shape: DeepPartialShape_<This[OPTIONS]['shape']>
					Output: DeepPartial_<This[OPTIONS]['Output']>
					Input: DeepNonStrictPartial_<This[OPTIONS]['Input']>
				}
			>
		: never

	export type WithDeepStrictPartial<This extends $$Object, O> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? Define<
				O,
				{
					// shape: DeepStrictPartialShape_<This[OPTIONS]['shape']>
					Output: DeepPartial_<This[OPTIONS]['Output']>
					Input: DeepPartial_<This[OPTIONS]['Input']>
				}
			>
		: never

	//

	export type GetShape<This extends { Output: unknown; Input: unknown }> = {
		[k in keyof This['Output']]: IsCompatible<
			This['Output'][k],
			This['Input'][k]
		> extends true
			? Schema<This['Output'][k]> | Inferable<This['Output'][k]>
			: CustomSchema<{ Output: This['Output'][k]; Input: This['Input'][k] }>
	}

	export type GetDeepShape<Output, Input> = {
		[k in keyof Output]: GetDeepShape.Rec<
			Output[k],
			k extends keyof Input ? Input[k] : never
		>
	}

	export namespace GetDeepShape {
		export type Rec<Output, Input> =
			IsCompatible<Output, Input> extends false
				? CustomSchema<{ Output: Output; Input: Input }>
				: Output extends InferableObject | InferableTuple
					? {
							[k in keyof Output]: Rec<Output[k], Output[k]>
						}
					: Schema<Output> | Inferable<Output>
	}

	// export type GetShape<This extends >
}
