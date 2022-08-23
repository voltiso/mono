// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'

import type {
	CustomSchema,
	DefaultTupleOptions,
	DefineSchema,
	GetTupleLength_,
	TupleOptions,
} from '~'

export type $CustomTuple<O extends Partial<TupleOptions>> = O extends any
	? CustomTuple<O>
	: never

export interface CustomTuple<O extends Partial<TupleOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Tuple'

	readonly [BASE_OPTIONS]: TupleOptions
	readonly [DEFAULT_OPTIONS]: DefaultTupleOptions

	//

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple']
	get getShape(): this[OPTIONS]['shape']
	get getLength(): GetTupleLength_<this[OPTIONS]['shape']>

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
