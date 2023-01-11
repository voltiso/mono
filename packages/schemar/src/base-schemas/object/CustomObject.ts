// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_,
	AlsoAccept,
	BASE_OPTIONS,
	DeepPartial_,
	DeepPartialOrUndefined_,
	DEFAULT_OPTIONS,
	OPTIONS,
	PartialOrUndefined_,
} from '@voltiso/util'

import type {
	$$Object,
	$$Schemable,
	CustomSchema,
	DefineSchema,
	GetDeepShape_,
	SCHEMA_NAME,
	SimpleSchema,
	Type,
} from '~'

import type {
	DeepPartialShape_,
	DeepStrictPartialShape_,
} from './DeepPartialShape'
import type { DefaultObjectOptions, ObjectOptions } from './ObjectOptions'
import type { PartialShape_, StrictPartialShape_ } from './PartialShape'

export interface CustomObject<O extends Partial<ObjectOptions>>
	extends $$Object,
		CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Object'

	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions

	//

	get getIndexSignatures(): this[OPTIONS]['indexSignatures']

	get getShape(): this[OPTIONS]['shape']
	get getDeepShape(): GetDeepShape_<this>

	//

	get plain(): CustomObject.WithPlain<this>

	/**
	 * Apply `.optional` to all properties
	 *
	 * - Similar to TypeScript's `Partial`
	 */
	get partial(): CustomObject.WithPartial<this>

	/** Apply `.strictPartial` to all properties */
	get strictPartial(): CustomObject.WithStrictPartial<this>

	/**
	 * Similar to `.partial`, but applied recursively
	 *
	 * - Note: removes any nested defaults
	 */
	get deepPartial(): CustomObject.WithDeepPartial<this>

	/**
	 * Similar to `.deepPartial`, but applied recursively
	 *
	 * - Note: removes any nested defaults
	 */
	get deepStrictPartial(): CustomObject.WithDeepStrictPartial<this>

	index<TKeySchema extends $$Schemable, TValueSchema extends $$Schemable>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): CustomObject.WithIndex<this, TKeySchema, TValueSchema>

	index<TValueSchema extends $$Schemable>(
		valueSchema: TValueSchema,
	): CustomObject.WithIndex<this, SimpleSchema<keyof any>, TValueSchema>
}

//

export namespace CustomObject {
	export type WithPlain<This extends $$Object> = This extends {
		Output: unknown
		Input: unknown
	}
		? DefineSchema<
				This,
				{
					isPlain: true

					// // eslint-disable-next-line etc/no-internal
					// Output: GetObjectType._IntersectWithObject<This['Output']>

					// // eslint-disable-next-line etc/no-internal
					// Input: GetObjectType._IntersectWithObject<This['Input']>
				}
		  >
		: never

	export type WithIndex<
		This extends $$Object,
		TKeySchema extends $$Schemable,
		TValueSchema extends $$Schemable,
	> = This extends { [OPTIONS]: ObjectOptions }
		? DefineSchema<
				This,
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

	export type WithPartial<This extends $$Object> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? CustomObject<{
				shape: PartialShape_<This[OPTIONS]['shape']>
				Output: Partial<This[OPTIONS]['Output']>
				Input: PartialOrUndefined_<This[OPTIONS]['Input']>
		  }>
		: never

	export type WithStrictPartial<This extends $$Object> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? CustomObject<{
				shape: StrictPartialShape_<This[OPTIONS]['shape']>
				Output: Partial<This[OPTIONS]['Output']>
				Input: Partial<This[OPTIONS]['Input']>
		  }>
		: never

	//

	export type WithDeepPartial<This extends $$Object> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? CustomObject<{
				shape: DeepPartialShape_<This[OPTIONS]['shape']>
				Output: DeepPartial_<This[OPTIONS]['Output']>
				Input: DeepPartialOrUndefined_<This[OPTIONS]['Input']>
		  }>
		: never

	export type WithDeepStrictPartial<This extends $$Object> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? CustomObject<{
				shape: DeepStrictPartialShape_<This[OPTIONS]['shape']>
				Output: DeepPartial_<This[OPTIONS]['Output']>
				Input: DeepPartial_<This[OPTIONS]['Input']>
		  }>
		: never
}
