// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, DeepPartial } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DeepPartialShape,
	DEFAULT_OPTIONS,
	DefaultObjectOptions,
	DefineSchema,
	InferableObject,
	MergeSchemaOptions,
	ObjectOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	PartialShape,
	SCHEMA_NAME,
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
	get deepPartial(): GetDeepPartial<this>
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
				Input: Partial<This[OPTIONS]['Input']>
			}
	  >
	: never

type GetDeepPartial<This> = This extends ObjectLike
	? DefineSchema<
			This,
			{
				shape: DeepPartialShape<This[OPTIONS]['shape']>
				Output: DeepPartial<This[OPTIONS]['Output']>
				Input: DeepPartial<This[OPTIONS]['Input']>
			}
	  >
	: never
