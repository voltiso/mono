// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	MergeOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { TupleOptions } from './_/TupleOptions.js'
import type { ITuple } from './ITuple.js'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore error TS2589: Type instantiation is excessively deep and possibly infinite.
export interface CustomTuple<O extends TupleOptions>
	extends ITuple<O>,
		CustomSchema<O> {
	get readonlyTuple(): MakeReadonlyTuple<this>

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type MakeReadonlyTuple<S extends ITuple> = CustomTuple<
	MergeOptions<
		S,
		{
			readonlyTuple: true
			_out: readonly [...S['OutputType']]
			_in: readonly [...S['InputType']]
		}
	>
>

type Optional<This extends ITuple> = CustomTuple<OptionalOptions<This>>
type Readonly<This extends ITuple> = CustomTuple<ReadonlyOptions<This>>
type Default<This extends ITuple> = CustomTuple<DefaultOptions<This>>
