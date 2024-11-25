// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, Callable } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type {
	$$Array,
	$$InferableReadonlyTuple,
	$$Schemable,
	$Type,
	CustomFunction,
	MutableTuple,
	Schema,
	TupleLike,
} from '~'

import { FunctionImpl } from './FunctionImpl'

// eslint-disable-next-line sonarjs/no-built-in-override
export type Function<F extends (...args: any) => any> = F extends (
	this: infer This,
	...rest: any[]
) => any
	? CustomFunction<{
			this: Schema<This>
			parameters: MutableTuple<Parameters<F>>
			return: Schema<ReturnType<F>>

			Output: F
			Input: F
		}>
	: CustomFunction<{
			parameters: MutableTuple<Parameters<F>>
			return: Schema<ReturnType<F>>

			Output: F
			Input: F
		}>

export type FunctionConstructor = new <
	Args extends $$InferableReadonlyTuple | TupleLike | $$Array,
	R extends $$Schemable,
>(
	parametersSchema: Args,
	returnSchema: R,
) => Function<
	Callable<{
		parameters: Assume<readonly unknown[], $Type<Args>>
		return: $Type<R>
	}>
>

// eslint-disable-next-line sonarjs/no-globals-shadowing, sonarjs/no-built-in-override
export const Function = lazyConstructor(
	() => FunctionImpl,
) as unknown as FunctionConstructor
