// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
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

import type { $$Object } from '~'
import type { GetObjectType, Type } from '~/GetType'
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
