// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	$Type,
	ArrayLike,
	InferableReadonlyTupleLike,
	SchemableLike,
	SchemaLike,
	TupleLike,
} from '~'
import { CustomFunctionImpl, defaultFunctionOptions, Function, schema } from '~'

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
		// eslint-disable-next-line @typescript-eslint/ban-types
	>(args: Args, r: R): Function<(...args: $Type<Args>) => R> {
		return new Function(args, r) as never
	}
}
