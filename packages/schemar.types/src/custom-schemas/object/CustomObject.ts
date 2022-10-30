// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'
import type {
	_,
	DeepPartial_,
	DeepPartialOrUndefined_,
	PartialOrUndefined_,
} from '@voltiso/util'

import type { $$InferableObject, $$Object } from '~'
import type { GetObjectType, Input_, Output_, Type } from '~/GetType'
import type { CustomSchema, SimpleSchema } from '~/Schema'
import type { $$Schemable, GetDeepShape_ } from '~/Schemable'
import type { DefineSchema } from '~/SchemaOptions'

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

	and<F extends $$InferableObject | $$Object>(
		additionalFields: F,
	): CustomObject.WithAnd<this, F>

	get partial(): CustomObject.WithPartial<this>
	get strictPartial(): CustomObject.WithStrictPartial<this>

	get deepPartial(): CustomObject.WithDeepPartial<this>
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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CustomObject {
	export type WithPlain<This extends $$Object> = This extends {
		Output: unknown
		Input: unknown
	}
		? DefineSchema<
				This,
				{
					isPlain: true
					// eslint-disable-next-line etc/no-internal
					Output: GetObjectType._IntersectWithObject<This['Output']>
					// eslint-disable-next-line etc/no-internal
					Input: GetObjectType._IntersectWithObject<This['Input']>
				}
		  >
		: never

	export type WithAnd<This extends $$Object, Other> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? Other extends undefined
			? This
			: // : IObject extends This
			  // ? Other
			  DefineSchema<
					This,
					{
						shape: _<
							This[OPTIONS]['shape'] &
								(Other extends $$Object & { getShape: {} }
									? Other['getShape']
									: Other)
						>
						Output: _<This[OPTIONS]['Output'] & Output_<Other>>
						Input: _<This[OPTIONS]['Input'] & Input_<Other>>
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
						}
					>
					Input: _<
						This[OPTIONS]['Input'] & {
							[k in Type<TKeySchema> & keyof any]: Type<TValueSchema>
						}
					>
				}
		  >
		: never

	export type WithPartial<This extends $$Object> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? DefineSchema<
				This,
				{
					shape: PartialShape_<This[OPTIONS]['shape']>
					Output: Partial<This[OPTIONS]['Output']>
					Input: PartialOrUndefined_<This[OPTIONS]['Input']>
				}
		  >
		: never

	export type WithStrictPartial<This extends $$Object> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? DefineSchema<
				This,
				{
					shape: StrictPartialShape_<This[OPTIONS]['shape']>
					Output: Partial<This[OPTIONS]['Output']>
					Input: Partial<This[OPTIONS]['Input']>
				}
		  >
		: never

	//

	export type WithDeepPartial<This extends $$Object> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? DefineSchema<
				This,
				{
					shape: DeepPartialShape_<This[OPTIONS]['shape']>
					Output: DeepPartial_<This[OPTIONS]['Output']>
					Input: DeepPartialOrUndefined_<This[OPTIONS]['Input']>
				}
		  >
		: never

	export type WithDeepStrictPartial<This extends $$Object> = This extends {
		[OPTIONS]: ObjectOptions
	}
		? DefineSchema<
				This,
				{
					shape: DeepStrictPartialShape_<This[OPTIONS]['shape']>
					Output: DeepPartial_<This[OPTIONS]['Output']>
					Input: DeepPartial_<This[OPTIONS]['Input']>
				}
		  >
		: never
}
