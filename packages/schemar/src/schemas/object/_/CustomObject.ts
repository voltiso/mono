// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeepPartial } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DeepPartialShape,
	DEFAULT_OPTIONS,
	DefaultObjectOptions,
	DefineSchema,
	InferableObject,
	ObjectOptions,
	OPTIONS,
	PartialShape,
	SCHEMA_NAME,
} from '~'

export interface CustomObject<O extends Partial<ObjectOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Object'
	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions
	//

	get getShape(): this[OPTIONS]['shape']

	//

	get partial(): DefineSchema<this, GetPartial<this>>
	get deepPartial(): DefineSchema<this, GetDeepPartial<this>>
}

//

type ObjectLike = {
	[OPTIONS]: { shape: InferableObject; Output: unknown; Input: unknown }
}

type GetPartial<This extends ObjectLike> = {
	shape: PartialShape<This[OPTIONS]['shape']>
	Output: Partial<This[OPTIONS]['Output']>
	Input: Partial<This[OPTIONS]['Input']>
}

type GetDeepPartial<This extends ObjectLike> = {
	shape: DeepPartialShape<This[OPTIONS]['shape']>
	Output: DeepPartial<This[OPTIONS]['Output']>
	Input: DeepPartial<This[OPTIONS]['Input']>
}
