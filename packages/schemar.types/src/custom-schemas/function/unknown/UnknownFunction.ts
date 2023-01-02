// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Array,
	$$Schemable,
	$$SchemableTuple,
	CustomFunction,
	CustomUnknownFunction,
	FunctionOptions,
} from '~'

/** @internal */
export type _MakeArrayMutable_<X> = X extends readonly unknown[]
	? [...X]
	: never

export interface UnknownFunction extends CustomUnknownFunction<{}> {
	/** No `this` */
	<Parameters extends $$SchemableTuple | $$Array, Return extends $$Schemable>(
		parametersSchema: Parameters,
		returnSchema: Return,
	): CustomFunction.FixInferredType<
		CustomFunction<{
			parameters: Parameters
			return: Return
		}>
	>

	/** With `this` */
	<
		This extends $$Schemable,
		Parameters extends $$SchemableTuple | $$Array,
		Return extends $$Schemable,
	>(
		this: This,
		parametersSchema: Parameters,
		returnSchema: Return,
	): CustomFunction.FixInferredType<
		CustomFunction<{
			this: This
			parameters: Parameters
			return: Return
		}>
	>

	/** Custom */
	<Options extends Partial<FunctionOptions>>(
		options: Options,
	): CustomFunction.FixInferredType<CustomFunction<Options>>
}
