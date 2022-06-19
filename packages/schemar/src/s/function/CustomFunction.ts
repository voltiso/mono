import {
	CustomSchema,
	DefaultOptions,
	InferableReadonlyTuple,
	IRootSchema,
	OptionalOptions,
	ReadonlyOptions,
	RootSchemable,
} from '../../schema'
import { IFunction } from './IFunction'
import { FunctionOptions } from './_/FunctionOptions'
import * as s from '..'

export interface CustomFunction<O extends FunctionOptions>
	extends IFunction<O>,
		CustomSchema<O> {
	<
		Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & IRootSchema),
		R extends RootSchemable
	>(
		argumentsSchema: Args,
		resultSchema: R
	): s.Function<Args, R>

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type Optional<This extends IFunction> = CustomFunction<OptionalOptions<This>>
type Readonly<This extends IFunction> = CustomFunction<ReadonlyOptions<This>>
type Default<This extends IFunction, D> = CustomFunction<
	DefaultOptions<This, D>
>
