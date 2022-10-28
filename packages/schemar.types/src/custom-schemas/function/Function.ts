// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, Callable } from '@voltiso/util'

import type { $$Array, TupleLike } from '~/custom-schemas'
import type { $Type } from '~/GetType'
import type { $$InferableReadonlyTuple } from '~/Inferable'
import type { SimpleSchema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

import type { CustomFunction } from './CustomFunction'

export type Function<F extends (...args: any) => any> = CustomFunction<{
	arguments: SimpleSchema<Parameters<F>>
	result: SimpleSchema<ReturnType<F>>

	Output: F
	Input: F
}>

export type FunctionConstructor = new <
	Args extends $$InferableReadonlyTuple | TupleLike | $$Array,
	R extends $$Schemable,
>(
	argumentsSchema: Args,
	resultSchema: R,
	// eslint-disable-next-line @typescript-eslint/ban-types
) => Function<
	Callable<{
		arguments: Assume<readonly unknown[], $Type<Args>>
		return: $Type<R>
	}>
>
