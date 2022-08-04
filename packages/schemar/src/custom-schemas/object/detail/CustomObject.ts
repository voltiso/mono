// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '_'
import type {
	Assume,
	DeepPartial,
	DeepPartialOrUndefined,
	PartialOrUndefined_,
} from '@voltiso/util'

import type {
	CustomSchema,
	DeepPartialShape,
	DeepStrictPartialShape,
	DefaultObjectOptions,
	DefineSchema,
	InferableObject,
	MergeSchemaOptions,
	ObjectOptions,
	PartialShape,
	StrictPartialShape,
} from '~'

export interface CustomObject<O extends Partial<ObjectOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Object'

	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		ObjectOptions,
		MergeSchemaOptions<DefaultObjectOptions, O>
	>

	//

	get getShape(): this[OPTIONS]['shape']

	//

	get partial(): GetPartial<this>
	get strictPartial(): GetStrictPartial<this>

	get deepPartial(): GetDeepPartial<this>
	get deepStrictPartial(): GetDeepStrictPartial<this>
}

//

type ObjectLike = {
	[OPTIONS]: { shape: InferableObject; Output: unknown; Input: unknown }
}

type GetPartial<This> = This extends ObjectLike
	? DefineSchema<
			This,
			{
				shape: PartialShape<This[OPTIONS]['shape']>
				Output: Partial<This[OPTIONS]['Output']>
				Input: PartialOrUndefined_<This[OPTIONS]['Input']>
			}
	  >
	: never

type GetStrictPartial<This> = This extends ObjectLike
	? DefineSchema<
			This,
			{
				shape: StrictPartialShape<This[OPTIONS]['shape']>
				Output: Partial<This[OPTIONS]['Output']>
				Input: Partial<This[OPTIONS]['Input']>
			}
	  >
	: never

//

type GetDeepPartial<This> = This extends ObjectLike
	? DefineSchema<
			This,
			{
				shape: DeepPartialShape<This[OPTIONS]['shape']>
				Output: DeepPartial<This[OPTIONS]['Output']>
				Input: DeepPartialOrUndefined<This[OPTIONS]['Input']>
			}
	  >
	: never

type GetDeepStrictPartial<This> = This extends ObjectLike
	? DefineSchema<
			This,
			{
				shape: DeepStrictPartialShape<This[OPTIONS]['shape']>
				Output: DeepPartial<This[OPTIONS]['Output']>
				Input: DeepPartial<This[OPTIONS]['Input']>
			}
	  >
	: never
