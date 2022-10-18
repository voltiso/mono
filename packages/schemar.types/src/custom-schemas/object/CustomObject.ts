// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'
import type {
	_,
	DeepPartial_,
	DeepPartialOrUndefined_,
	PartialOrUndefined_,
} from '@voltiso/util'

import type { InferableObjectLike, ObjectLike } from '~'
import type { InputType_, OutputType_, Type } from '~/GetType'
import type { CustomSchema, SimpleSchema } from '~/Schema'
import type { GetDeepShape_, SchemableLike } from '~/Schemable'
import type { DefineSchema } from '~/SchemaOptions'

import type {
	DeepPartialShape_,
	DeepStrictPartialShape_,
} from './DeepPartialShape'
import type { DefaultObjectOptions, ObjectOptions } from './ObjectOptions'
import type { PartialShape_, StrictPartialShape_ } from './PartialShape'

export type $CustomObject<O extends Partial<ObjectOptions>> = O extends any
	? CustomObject<O>
	: never

export interface CustomObject<O extends Partial<ObjectOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Object'

	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions

	//

	get getIndexSignatures(): this[OPTIONS]['indexSignatures']

	get getShape(): this[OPTIONS]['shape']
	get getDeepShape(): GetDeepShape_<this>

	//

	and<F extends InferableObjectLike | ObjectLike>(
		additionalFields: F,
	): _GetAnd<this, F>

	get partial(): _GetPartial_<this>
	get strictPartial(): _GetStrictPartial_<this>

	get deepPartial(): _GetDeepPartial_<this>
	get deepStrictPartial(): _GetDeepStrictPartial_<this>

	index<TKeySchema extends SchemableLike, TValueSchema extends SchemableLike>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): _GetIndex<this, TKeySchema, TValueSchema>

	index<TValueSchema extends SchemableLike>(
		valueSchema: TValueSchema,
	): _GetIndex<this, SimpleSchema<keyof any>, TValueSchema>
}

//

export type _ObjectLike = {
	[OPTIONS]: { shape: any; Output: any; Input: any }
}

//

export type _GetAnd<This, Other> = This extends _ObjectLike
	? DefineSchema<
			This,
			{
				shape: _<
					This[OPTIONS]['shape'] &
						(Other extends ObjectLike ? Other['getShape'] : Other)
				>
				Output: _<This[OPTIONS]['Output'] & OutputType_<Other>>
				Input: _<This[OPTIONS]['Input'] & InputType_<Other>>
			}
	  >
	: never

export type _GetIndex<
	This,
	TKeySchema extends SchemableLike,
	TValueSchema extends SchemableLike,
> = This extends _ObjectLike
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

export type _GetPartial_<This> = This extends _ObjectLike
	? DefineSchema<
			This,
			{
				shape: PartialShape_<This[OPTIONS]['shape']>
				Output: Partial<This[OPTIONS]['Output']>
				Input: PartialOrUndefined_<This[OPTIONS]['Input']>
			}
	  >
	: never

export type _GetStrictPartial_<This> = This extends _ObjectLike
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

export type _GetDeepPartial_<This> = This extends _ObjectLike
	? DefineSchema<
			This,
			{
				shape: DeepPartialShape_<This[OPTIONS]['shape']>
				Output: DeepPartial_<This[OPTIONS]['Output']>
				Input: DeepPartialOrUndefined_<This[OPTIONS]['Input']>
			}
	  >
	: never

export type _GetDeepStrictPartial_<This> = This extends _ObjectLike
	? DefineSchema<
			This,
			{
				shape: DeepStrictPartialShape_<This[OPTIONS]['shape']>
				Output: DeepPartial_<This[OPTIONS]['Output']>
				Input: DeepPartial_<This[OPTIONS]['Input']>
			}
	  >
	: never
