// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import { lazyConstructor, lazyFunction } from '@voltiso/util'

import type {
	$$Array,
	$$Schemable,
	$$SchemableTuple,
	CustomFunction,
	CustomFunction$,
	CustomUnknownFunction,
	CustomUnknownFunction$,
	FunctionOptions,
	RelaxSchema_,
} from '~'

import { UnknownFunctionImpl } from './UnknownFunctionImpl'

/** @internal */
export type _MakeArrayMutable_<X> = X extends readonly unknown[]
	? [...X]
	: never

export interface UnknownFunction extends CustomUnknownFunction<{}> {}

export interface UnknownFunction$ extends CustomUnknownFunction$<{}> {
	/** No `this` */
	<Parameters extends $$SchemableTuple | $$Array, Return extends $$Schemable>(
		parametersSchema: Parameters,
		returnSchema: Return,
	): CustomFunction.FixInferredType<
		CustomFunction<{
			parameters: RelaxSchema_<Parameters>
			return: RelaxSchema_<Return> & $$Schemable
		}>,
		{
			parameters: RelaxSchema_<Parameters>
			return: RelaxSchema_<Return>
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
			this: RelaxSchema_<This> & $$Schemable
			parameters: RelaxSchema_<Parameters>
			return: RelaxSchema_<Return> & $$Schemable
		}>,
		{
			this: RelaxSchema_<This>
			parameters: RelaxSchema_<Parameters>
			return: RelaxSchema_<Return>
		}
	>

	/** Custom */
	<Options extends Partial<FunctionOptions>>(
		options: Options,
	): CustomFunction.FixInferredType<
		CustomFunction$<UnknownFunction.RelaxOptions<Options>>,
		UnknownFunction.RelaxOptions<Options>
	>

	//

	get Final(): UnknownFunction
}

export declare namespace UnknownFunction {
	export type RelaxOptions<O extends Partial<FunctionOptions>> = O extends any
		? _<
				(O extends {
					readonly this: infer This
				}
					? {
							this: RelaxSchema_<This>
						}
					: unknown) &
					(O extends {
						readonly parameters: infer Parameters
					}
						? {
								parameters: RelaxSchema_<Parameters>
							}
						: unknown) &
					(O extends {
						readonly return: infer Return
					}
						? {
								return: RelaxSchema_<Return>
							}
						: unknown) &
					Omit<O, 'this' | 'parameters' | 'return'>
			>
		: never
}

//

export const UnknownFunction$ = lazyConstructor(
	() => UnknownFunctionImpl,
) as unknown as UnknownFunction$Constructor

export type UnknownFunction$Constructor = new () => UnknownFunction$

//

// eslint-disable-next-line sonarjs/variable-name
const function_: UnknownFunction$ = lazyFunction(() => new UnknownFunction$())

export { function_ as function }
