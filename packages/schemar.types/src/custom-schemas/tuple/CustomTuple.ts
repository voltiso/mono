// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type {
	_GetArrayLength_,
	$$Tuple,
	CustomSchema,
	DefaultTupleOptions,
	DefineSchema,
	TupleOptions,
} from '~'

export interface CustomTuple<O extends Partial<TupleOptions>>
	extends $$Tuple,
		CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Tuple'

	readonly [BASE_OPTIONS]: TupleOptions
	readonly [DEFAULT_OPTIONS]: DefaultTupleOptions

	//

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple']
	get getShape(): this[OPTIONS]['shape']
	// eslint-disable-next-line etc/no-internal
	get getLength(): _GetArrayLength_<this[OPTIONS]['shape']>

	//

	get readonlyTuple(): CustomTuple.Readonly<this>
	get mutableTuple(): CustomTuple.Mutable<this>
}

export namespace CustomTuple {
	export type Readonly<S extends $$Tuple> = S extends {
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

	export type Mutable<S extends $$Tuple> = S extends {
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
}
