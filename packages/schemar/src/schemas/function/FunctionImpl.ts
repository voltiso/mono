// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { InferableReadonlyTuple, ISchema, Schemable } from '~'
import { CustomFunctionImpl, defaultFunctionOptions } from '~'
import * as s from '~'

export class FunctionImpl<
	Args extends InferableReadonlyTuple | s.ITuple | s.IArray,
	R extends Schemable,
> extends lazyConstructor(() => CustomFunctionImpl)<never> {
	constructor(args: Args, result: R) {
		super({
			...defaultFunctionOptions,
			arguments: s.schema(args as never),
			result: s.schema(result),
		} as never)

		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<
		Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & ISchema),
		R extends Schemable,
	>(args: Args, r: R): s.Function<(...args: s.GetType<Args>) => R> {
		return new s.Function(args, r) as never
	}
}
