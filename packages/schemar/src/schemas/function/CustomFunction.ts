// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	InferableReadonlyTuple,
	IRootSchema,
	OptionalOptions,
	SCHEMA_OPTIONS,
	ReadonlyOptions,
	RootSchemable,
} from '../../Schema/index'
import type * as s from '../index'
import type { FunctionOptions } from './_/FunctionOptions.js'
import type { IFunction } from './IFunction.js'

export interface CustomFunction<O extends FunctionOptions>
	extends IFunction<O>,
		CustomSchema<O> {
	<
		Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & IRootSchema),
		R extends RootSchemable,
	>(
		argumentsSchema: Args,
		resultSchema: R,
	): s.Function<Args, R>

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends IFunction> = CustomFunction<OptionalOptions<This>>
type Readonly<This extends IFunction> = CustomFunction<ReadonlyOptions<This>>
type Default<This extends IFunction> = CustomFunction<DefaultOptions<This>>
