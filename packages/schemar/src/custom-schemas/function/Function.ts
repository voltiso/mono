// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type {
	$Type,
	ArrayLike,
	CustomFunction,
	InferableReadonlyTupleLike,
	SchemableLike,
	SimpleSchema,
	TupleLike,
} from '~'
import { FunctionImpl } from '~'

export type Function<F extends (...args: any) => any> = CustomFunction<{
	arguments: SimpleSchema<Parameters<F>>
	result: SimpleSchema<ReturnType<F>>

	Output: F
	Input: F
}>

export const Function = lazyConstructor(
	() => FunctionImpl,
) as unknown as FunctionConstructor

type FunctionConstructor = new <
	Args extends InferableReadonlyTupleLike | TupleLike | ArrayLike,
	R extends SchemableLike,
>(
	argumentsSchema: Args,
	resultSchema: R,
	// eslint-disable-next-line @typescript-eslint/ban-types
) => Function<(...args: $Type<Args>) => $Type<R>>
