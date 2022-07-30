// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultTupleOptions,
	DefineSchema,
	GetTupleLength,
	MergeSchemaOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
	TupleOptions,
} from '~'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore error TS2589: Type instantiation is excessively deep and possibly infinite.
export interface CustomTuple<O extends Partial<TupleOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Tuple'

	readonly [BASE_OPTIONS]: TupleOptions
	readonly [DEFAULT_OPTIONS]: DefaultTupleOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		TupleOptions,
		MergeSchemaOptions<DefaultTupleOptions, O>
	>

	//

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple']
	get getElementSchemas(): this[OPTIONS]['elementSchemas']
	get getLength(): GetTupleLength<this[OPTIONS]['elementSchemas']>

	//

	get readonlyTuple(): MakeReadonlyTuple<this>
}

type MakeReadonlyTuple<S> = S extends {
	[OPTIONS]: { Output: readonly unknown[]; Input: readonly unknown[] }
}
	? DefineSchema<
			S,
			{
				readonlyTuple: true
				Output: readonly [...S[OPTIONS]['Output']]
				Input: readonly [...S[OPTIONS]['Input']]
			}
	  >
	: never
