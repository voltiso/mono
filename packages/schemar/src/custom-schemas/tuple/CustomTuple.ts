// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '_'
import type { Assume } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultTupleOptions,
	DefineSchema,
	GetTupleLength_,
	MergeSchemaOptions,
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
	get getLength(): GetTupleLength_<this[OPTIONS]['elementSchemas']>

	//

	get readonlyTuple(): MakeReadonlyTuple<this>
	get mutableTuple(): MakeMutableTuple<this>
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

type MakeMutableTuple<S> = S extends {
	[OPTIONS]: { Output: readonly unknown[]; Input: readonly unknown[] }
}
	? DefineSchema<
			S,
			{
				readonlyTuple: false
				Output: [...S[OPTIONS]['Output']]
				Input: [...S[OPTIONS]['Input']]
			}
	  >
	: never
