// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'
import type {
	DeepPartial_,
	DeepPartialOrUndefined_,
	PartialOrUndefined_,
} from '@voltiso/util'

import type {
	CustomSchema,
	DeepPartialShape_,
	DeepStrictPartialShape_,
	DefaultObjectOptions,
	DefineSchema,
	ObjectOptions,
	PartialShape_,
	StrictPartialShape_,
} from '~'

export interface CustomObject<O extends Partial<ObjectOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Object'

	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	ObjectOptions,
	// 	MergeSchemaOptions<DefaultObjectOptions, O>
	// >

	//

	get getShape(): this[OPTIONS]['shape']

	//

	get partial(): _GetPartial_<this>
	get strictPartial(): _GetStrictPartial_<this>

	get deepPartial(): _GetDeepPartial_<this>
	get deepStrictPartial(): _GetDeepStrictPartial_<this>
}

//

export type _ObjectLike = {
	[OPTIONS]: { shape: any; Output: any; Input: any }
}

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
