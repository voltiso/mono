// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type {
	Assume,
	BASE_OPTIONS,
	Callable_,
	DEFAULT_OPTIONS,
	NoThis,
	OPTIONS,
} from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	$$SchemableTuple,
	$Input_,
	$Output_,
	CustomSchema,
	DefaultFunctionOptions,
	DefineSchema,
	FunctionOptions,
	InferSchema,
	Input_,
	Output_,
	Rest,
	SchemaLike,
} from '~'

export interface $$Function extends $$Schema {
	readonly [SCHEMA_NAME]: 'Function'
}

export interface CustomFunction<O extends Partial<FunctionOptions>>
	extends $$Function,
		CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	//

	readonly Outer: this[OPTIONS]['Outer']
	readonly Inner: this[OPTIONS]['Inner']

	readonly OutputThis: Output_<this[OPTIONS]['this']>
	readonly InputThis: Input_<this[OPTIONS]['this']>
	readonly This: this['OutputThis']

	readonly OutputParameters: Assume<
		unknown[],
		Output_<this[OPTIONS]['parameters']>
	>

	readonly InputParameters: Assume<
		unknown[],
		Input_<this[OPTIONS]['parameters']>
	>

	readonly Parameters: this['OutputParameters']

	readonly OutputReturn: Output_<this[OPTIONS]['return']>
	readonly InputReturn: Input_<this[OPTIONS]['return']>
	readonly Return: this['OutputReturn']

	//

	this<NewThis extends $$Schemable>(
		newThis: NewThis,
	): CustomFunction.WithThis<this, NewThis>

	parameters<NewParameters extends $$SchemableTuple>(
		newParameters: NewParameters,
	): DefineSchema<this, { parameters: NewParameters }>

	return<NewReturn extends SchemaLike<any>>(
		newReturn: NewReturn,
	): DefineSchema<this, { return: NewReturn }>

	//

	get hasThis(): this[OPTIONS]['this'] extends NoThis ? false : true
	get getThisSchema(): InferSchema<this[OPTIONS]['this']>
	get getParametersSchema(): InferSchema<this[OPTIONS]['parameters']>
	get getReturnSchema(): InferSchema<this[OPTIONS]['return']>
}

export namespace CustomFunction {
	export type WithThis<
		This extends $$Schema,
		NewThis extends $$Schemable,
	> = FixInferredType<DefineSchema<This, { this: NewThis; hasThis: true }>>

	export type FixInferredType<This extends $$Schema> = This extends {
		[OPTIONS]: {
			// hasThis: unknown
			this: unknown
			parameters: unknown
			return: unknown
		}
	}
		? DefineSchema<
				This,
				{
					Input: Callable_<{
						this: Input_<This[OPTIONS]['this']>

						parameters: Assume<
							readonly unknown[],
							$Input_<CustomFunction.FixParameters<This[OPTIONS]['parameters']>>
						>

						return: Input_<This[OPTIONS]['return']>
					}>

					Output: Callable_<{
						this: Output_<This[OPTIONS]['this']>

						parameters: Assume<
							readonly unknown[],
							$Output_<
								CustomFunction.FixParameters<This[OPTIONS]['parameters']>
							>
						> // $Output_<This[OPTIONS]['parameters']>

						return: Output_<This[OPTIONS]['return']>
					}>

					//

					Inner: Callable_<{
						this: Output_<This[OPTIONS]['this']>

						parameters: Assume<
							readonly unknown[],
							$Output_<
								CustomFunction.FixParameters<This[OPTIONS]['parameters']>
							>
						> // $Output_<This[OPTIONS]['parameters']>

						return: Input_<This[OPTIONS]['return']>
					}>

					Outer: Callable_<{
						this: Input_<This[OPTIONS]['this']>

						parameters: Assume<
							readonly unknown[],
							$Input_<CustomFunction.FixParameters<This[OPTIONS]['parameters']>>
						> // $Output_<This[OPTIONS]['parameters']>

						return: Output_<This[OPTIONS]['return']>
					}>
				}
		  >
		: never
}

export namespace CustomFunction {
	export type FixParameters<Ts> = Ts extends readonly unknown[]
		? [...Ts] | FixParameters.Rec<never, [], [...Ts]>
		: Ts

	export namespace FixParameters {
		export type Rec<final, acc extends unknown[], Ts> = Ts extends Rest[]
			? final
			: Ts extends [infer T, ...infer Tss]
			? T extends $$Schema & { isOptional: true }
				? Rec<final | acc, [...acc, T], Tss>
				: Rec<final, [...acc, T], Tss>
			: final
	}
}

// type P = readonly [
// 	t.String,
// 	t.CustomString<{
// 		isOptional: true
// 	}>,
// 	...t.Rest<t.Number>[],
// ]

// type A = CustomFunction.FixParameters<P>
