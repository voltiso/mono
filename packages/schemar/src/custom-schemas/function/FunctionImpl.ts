// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	GetType,
	IArray,
	InferableReadonlyTuple,
	ISchema,
	ITuple,
	Schemable,
} from '~'
import { CustomFunctionImpl, defaultFunctionOptions, Function, schema } from '~'

export class FunctionImpl<
	Args extends InferableReadonlyTuple | ITuple | IArray,
	R extends Schemable,
> extends lazyConstructor(() => CustomFunctionImpl)<never> {
	constructor(args: Args, result: R) {
		super({
			...defaultFunctionOptions,
			arguments: schema(args as never),
			result: schema(result),
		} as never)

		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<
		Args extends InferableReadonlyTuple | ((ITuple | IArray) & ISchema),
		R extends Schemable,
		// eslint-disable-next-line @typescript-eslint/ban-types
	>(args: Args, r: R): Function<(...args: GetType<Args>) => R> {
		return new Function(args, r) as never
	}
}