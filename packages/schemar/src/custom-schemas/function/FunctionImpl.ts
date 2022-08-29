// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Type,
	ArrayLike,
	InferableReadonlyTupleLike,
	SchemableLike,
	SchemaLike,
	TupleLike,
} from '@voltiso/schemar.types'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import { schema } from '../unknownSchema'
import { CustomFunctionImpl } from './CustomFunctionImpl'
import { defaultFunctionOptions } from './defaultFunctionOptions'
import type * as s from './Function'

export class FunctionImpl<
	Args extends InferableReadonlyTupleLike | TupleLike | ArrayLike,
	R extends SchemableLike,
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
		Args extends
			| InferableReadonlyTupleLike
			| ((TupleLike | ArrayLike) & SchemaLike),
		R extends SchemableLike,
	>(args: Args, r: R): s.Function<(...args: $Type<Args>) => R> {
		return new FunctionImpl(args, r) as never
	}
}
