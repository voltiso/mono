// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type {
	$Type,
	CustomFunction,
	IArray,
	InferableReadonlyTuple,
	ISchema,
	ITuple,
	Schemable,
} from '~'
import { FunctionImpl } from '~'

// type GetFunctionType<O extends FunctionOptions, P extends GetTypeOptions> = (
// 	...args: GetType_<O['arguments'], P>
// ) => GetType_<O['result'], P>

export type Function<
	F extends (...args: any) => unknown,
	// Args extends InferableReadonlyTuple | (s.ITuple | s.IArray),
	// R extends Schemable,
> = CustomFunction<{
	arguments: ISchema<Parameters<F>>
	result: ISchema<ReturnType<F>>

	Output: F
	Input: F

	// Output: (
	// 	...args: GetType_<Args, { kind: 'out' }>
	// ) => GetType_<R, { kind: 'out' }>

	// Input: (
	// 	...args: GetType_<Args, { kind: 'in' }>
	// ) => GetType_<R, { kind: 'in' }>
}>

export const Function = lazyConstructor(
	() => FunctionImpl,
) as unknown as FunctionConstructor

type FunctionConstructor = new <
	Args extends InferableReadonlyTuple | ITuple | IArray,
	R extends Schemable,
>(
	argumentsSchema: Args,
	resultSchema: R,
	// eslint-disable-next-line @typescript-eslint/ban-types
) => Function<(...args: $Type<Args>) => $Type<R>>
