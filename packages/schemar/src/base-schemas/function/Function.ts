// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
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
	SimpleSchema,
	TupleLike,
} from '~'

import { FunctionImpl } from './FunctionImpl'

export type Function<F extends (...args: any) => any> = F extends (
	this: infer This,
	...rest: any[]
) => any
	? CustomFunction<{
			this: SimpleSchema<This>
			parameters: MutableTuple<Parameters<F>>
			return: SimpleSchema<ReturnType<F>>

			Output: F
			Input: F
	  }>
	: CustomFunction<{
			parameters: MutableTuple<Parameters<F>>
			return: SimpleSchema<ReturnType<F>>

			Output: F
			Input: F
	  }>

export type FunctionConstructor = new <
	Args extends $$InferableReadonlyTuple | TupleLike | $$Array,
	R extends $$Schemable,
>(
	parametersSchema: Args,
	returnSchema: R,
	// eslint-disable-next-line @typescript-eslint/ban-types
) => Function<
	Callable<{
		parameters: Assume<readonly unknown[], $Type<Args>>
		return: $Type<R>
	}>
>

export const Function = lazyConstructor(
	() => FunctionImpl,
) as unknown as FunctionConstructor
