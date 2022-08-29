import type { TupleLike, ArrayLike } from '~/custom-schemas'
import type { $Type } from '~/GetType'
import type { InferableReadonlyTupleLike } from '~/Inferable'
import type { SimpleSchema } from '~/Schema'
import type { SchemableLike } from '~/Schemable'
import type { CustomFunction } from './CustomFunction'

export type Function<F extends (...args: any) => any> = CustomFunction<{
	arguments: SimpleSchema<Parameters<F>>
	result: SimpleSchema<ReturnType<F>>

	Output: F
	Input: F
}>

export type FunctionConstructor = new <
	Args extends InferableReadonlyTupleLike | TupleLike | ArrayLike,
	R extends SchemableLike,
>(
	argumentsSchema: Args,
	resultSchema: R,
	// eslint-disable-next-line @typescript-eslint/ban-types
) => Function<(...args: $Type<Args>) => $Type<R>>
