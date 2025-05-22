// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable tsdoc/syntax */

import type { $Override_, Assume, Callable_, OPTIONS } from '@voltiso/util'

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
	SchemaLike,
} from '~'

export interface $$Function extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Function'
}

export interface CustomFunction<O extends Partial<FunctionOptions>>
	extends $$Function,
		CustomSchema<O> {
	//

	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Function'

	readonly [Voltiso.BASE_OPTIONS]: FunctionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: FunctionOptions.Default

	//

	readonly Outer: this[Voltiso.OPTIONS]['Outer']
	readonly Inner: this[Voltiso.OPTIONS]['Inner']

	readonly OutputThis: Output_<this[Voltiso.OPTIONS]['this']>
	readonly InputThis: Input_<this[Voltiso.OPTIONS]['this']>
	readonly This: this['OutputThis']

	readonly OutputParameters: unknown[] &
		Output_<this[Voltiso.OPTIONS]['parameters']>
	readonly InputParameters: unknown[] &
		Input_<this[Voltiso.OPTIONS]['parameters']>

	readonly Parameters: this['OutputParameters']

	readonly OutputReturn: Output_<this[Voltiso.OPTIONS]['return']>
	readonly InputReturn: Input_<this[Voltiso.OPTIONS]['return']>
	readonly Return: this['OutputReturn']

	//

	get hasThis(): [this[Voltiso.OPTIONS]['this']] extends [Voltiso.UNSET]
		? false
		: true

	get getThisSchema(): [this[Voltiso.OPTIONS]['this']] extends [Voltiso.UNSET]
		? never
		: GetFinalSchema_<
				ImplicitInferSchema$.Simple<this[Voltiso.OPTIONS]['this']>
			>

	get getParametersSchema(): ImplicitInferSchema$.Simple<
		this[Voltiso.OPTIONS]['parameters']
	>
	get getReturnSchema(): ImplicitInferSchema$.Simple<
		this[Voltiso.OPTIONS]['return']
	>
}

//

export interface CustomFunction$<O extends Partial<FunctionOptions>>
	extends $$Function,
		CustomSchema$<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Function'

	readonly [Voltiso.BASE_OPTIONS]: FunctionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: FunctionOptions.Default

	//

	readonly Outer: this[Voltiso.OPTIONS]['Outer']
	readonly Inner: this[Voltiso.OPTIONS]['Inner']

	readonly OutputThis: Output_<this[Voltiso.OPTIONS]['this']>
	readonly InputThis: Input_<this[Voltiso.OPTIONS]['this']>
	readonly This: this['OutputThis']

	readonly OutputParameters: Assume<
		unknown[],
		Output_<this[Voltiso.OPTIONS]['parameters']>
	>

	readonly InputParameters: Assume<
		unknown[],
		Input_<this[Voltiso.OPTIONS]['parameters']>
	>

	readonly Parameters: this['OutputParameters']

	readonly OutputReturn: Output_<this[Voltiso.OPTIONS]['return']>
	readonly InputReturn: Input_<this[Voltiso.OPTIONS]['return']>
	readonly Return: this['OutputReturn']

	//

	get hasThis(): this[Voltiso.OPTIONS]['this'] extends Voltiso.UNSET
		? false
		: true
	get getThisSchema(): ImplicitInferSchema$<this[Voltiso.OPTIONS]['this']>
	get getParametersSchema(): ImplicitInferSchema$<
		this[Voltiso.OPTIONS]['parameters']
	>
	get getReturnSchema(): ImplicitInferSchema$<this[Voltiso.OPTIONS]['return']>

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
			/** HasThis: unknown */
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
							$Input_<FixParameters<This[OPTIONS]['parameters']>>
						>

						return: Input_<This[OPTIONS]['return']>
					}>

					Output: Callable_<{
						this: Output_<This[OPTIONS]['this']>

						/** $Output_<This[OPTIONS]['parameters']> */
						parameters: Assume<
							readonly unknown[],
							$Output_<FixParameters<This[OPTIONS]['parameters']>>
						>

						return: Output_<This[OPTIONS]['return']>
					}>

					//

					Inner: Callable_<{
						this: Output_<This[OPTIONS]['this']>

						/** $Output_<This[OPTIONS]['parameters']> */
						parameters: Assume<
							readonly unknown[],
							$Output_<FixParameters<This[OPTIONS]['parameters']>>
						>

						return: Input_<This[OPTIONS]['return']>
					}>

					Outer: Callable_<{
						this: Input_<This[OPTIONS]['this']>

						/** $Output_<This[OPTIONS]['parameters']> */
						parameters: Assume<
							readonly unknown[],
							$Input_<FixParameters<This[OPTIONS]['parameters']>>
						>

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
