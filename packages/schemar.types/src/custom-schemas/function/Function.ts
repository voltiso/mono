// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, Callable } from '@voltiso/util'

import type { $$Array, MutableTuple, TupleLike } from '~/custom-schemas'
import type { $Type } from '~/GetType'
import type { $$InferableReadonlyTuple } from '~/Inferable'
import type { SimpleSchema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

import type { CustomFunction } from './CustomFunction'

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
