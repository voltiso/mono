// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import type { Merge2Simple } from '@voltiso/util'
import { lazyValue } from '@voltiso/util'

import type { GetType_ } from '../../GetType/index'
import type {
	InferableReadonlyTuple,
	IRootSchema,
	RootSchemable,
} from '../../Schema/index'
import * as s from '../index'
import type { GetSchema_ } from '../unknownSchema/getSchema/index'
import type { DefaultFunctionOptions } from './_/FunctionOptions.js'
import type { CustomFunction } from './CustomFunction.js'
import { Function_ } from './Function_.js'

// type GetFunctionType<O extends FunctionOptions, P extends GetTypeOptions> = (
// 	...args: GetType_<O['arguments'], P>
// ) => GetType_<O['result'], P>

export type Function<
	Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & IRootSchema),
	R extends RootSchemable,
> = CustomFunction<
	Merge2Simple<
		DefaultFunctionOptions,
		{
			arguments: GetSchema_<Args>
			result: GetSchema_<R>

			_out: (
				...args: GetType_<Args, { kind: 'out' }>
			) => GetType_<R, { kind: 'out' }>

			_in: (
				...args: GetType_<Args, { kind: 'in' }>
			) => GetType_<R, { kind: 'in' }>
		}
	>
>

export const Function = Function_ as unknown as SFunctionConstructor

type SFunctionConstructor = new <
	Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & IRootSchema),
	R extends RootSchemable,
>(
	argumentsSchema: Args,
	resultSchema: R,
) => Function<Args, R>

const function_ = lazyValue(() => new Function(s.array(s.never), s.unknown))

export { function_ as function }
