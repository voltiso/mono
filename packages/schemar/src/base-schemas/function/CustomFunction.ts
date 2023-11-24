// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Override_,
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
	CustomSchema$,
	FunctionOptions,
	GetFinalSchema_,
	ImplicitInferSchema$,
	Input_,
	Output_,
	Rest,
	SCHEMA_NAME,
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
	readonly [DEFAULT_OPTIONS]: FunctionOptions.Default

	//

	readonly Outer: this[OPTIONS]['Outer']
	readonly Inner: this[OPTIONS]['Inner']

	readonly OutputThis: Output_<this[OPTIONS]['this']>
	readonly InputThis: Input_<this[OPTIONS]['this']>
	readonly This: this['OutputThis']

	readonly OutputParameters: unknown[] & Output_<this[OPTIONS]['parameters']>
	readonly InputParameters: unknown[] & Input_<this[OPTIONS]['parameters']>

	readonly Parameters: this['OutputParameters']

	readonly OutputReturn: Output_<this[OPTIONS]['return']>
	readonly InputReturn: Input_<this[OPTIONS]['return']>
	readonly Return: this['OutputReturn']

	//

	get hasThis(): [this[OPTIONS]['this']] extends [NoThis] ? false : true

	get getThisSchema(): [this[OPTIONS]['this']] extends [NoThis]
		? never
		: GetFinalSchema_<ImplicitInferSchema$.Simple<this[OPTIONS]['this']>>

	get getParametersSchema(): ImplicitInferSchema$.Simple<
		this[OPTIONS]['parameters']
	>
	get getReturnSchema(): ImplicitInferSchema$.Simple<this[OPTIONS]['return']>
}

//

export interface CustomFunction$<O extends Partial<FunctionOptions>>
	extends $$Function,
		CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: FunctionOptions.Default

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

	get hasThis(): this[OPTIONS]['this'] extends NoThis ? false : true
	get getThisSchema(): ImplicitInferSchema$<this[OPTIONS]['this']>
	get getParametersSchema(): ImplicitInferSchema$<this[OPTIONS]['parameters']>
	get getReturnSchema(): ImplicitInferSchema$<this[OPTIONS]['return']>

	//

	get Final(): CustomFunction<O>

	//

	this<NewThis extends $$Schemable>(
		newThis: NewThis,
	): CustomFunction.WithThis<O, NewThis>

	parameters<NewParameters extends $$SchemableTuple>(
		newParameters: NewParameters,
	): CustomFunction$<$Override_<O, { parameters: NewParameters }>>

	return<NewReturn extends SchemaLike<any>>(
		newReturn: NewReturn,
	): CustomFunction$<$Override_<O, { return: NewReturn }>>
}

//

export declare namespace CustomFunction {
	export type With<O, OO> = CustomFunction$<$Override_<O, OO>>

	export type WithThis<O, NewThis extends $$Schemable> = FixInferredType<
		CustomFunction$<$Override_<O, { this: NewThis; hasThis: true }>>,
		O
	>

	export type FixInferredType<This extends $$Schema, O> = This extends {
		[OPTIONS]: {
			// hasThis: unknown
			this: unknown
			parameters: unknown
			return: unknown
		}
	}
		? With<
				O,
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
