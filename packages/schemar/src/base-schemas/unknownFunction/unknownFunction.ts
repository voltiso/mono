// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	$$Array,
	$$Schemable,
	$$SchemableTuple,
	CustomFunction,
	CustomUnknownFunction,
	FunctionOptions,
} from '~'

import { UnknownFunctionImpl } from './UnknownFunctionImpl'

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
		}>,
		{
			parameters: Parameters
			return: Return
		}
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
		}>,
		{
			this: This
			parameters: Parameters
			return: Return
		}
	>

	/** Custom */
	<Options extends Partial<FunctionOptions>>(
		options: Options,
	): CustomFunction.FixInferredType<CustomFunction<Options>, Options>
}

//

export const UnknownFunction = lazyConstructor(
	() => UnknownFunctionImpl,
) as unknown as UnknownFunctionConstructor

type UnknownFunctionConstructor = new () => UnknownFunction

//

const function_: UnknownFunction = lazyValue(() => new UnknownFunction())

export { function_ as function }
