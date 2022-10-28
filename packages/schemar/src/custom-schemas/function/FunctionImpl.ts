// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$InferableReadonlyTuple,
	$$Schemable,
	$Type,
	ArrayLike,
	SchemaLike,
	TupleLike,
} from '@voltiso/schemar.types'
import { BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import { schema } from '../unknownSchema'
import { CustomFunctionImpl } from './CustomFunctionImpl'
import { defaultFunctionOptions } from './defaultFunctionOptions'
import type * as s from './Function'

export class FunctionImpl<
	Args extends $$InferableReadonlyTuple | TupleLike | ArrayLike,
	R extends $$Schemable,
> extends lazyConstructor(() => CustomFunctionImpl)<never> {
	constructor(args: Args, result: R) {
		super({
			...defaultFunctionOptions,
			arguments: schema(args as never),
			result: schema(result),
		} as never)

		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<
		Args extends
			| $$InferableReadonlyTuple
			| ((TupleLike | ArrayLike) & SchemaLike),
		R extends $$Schemable,
	>(args: Args, r: R): s.Function<(...args: $Type<Args>) => R> {
		return new FunctionImpl(args, r) as never
	}
}
