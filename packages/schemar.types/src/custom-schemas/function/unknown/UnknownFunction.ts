// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$OutputType,
	CustomUnknownFunction,
	Function,
	InferableTupleLike,
	OutputType,
	Schemable,
	SchemaLike,
} from '~'

/** @internal */
export type _MakeArrayMutable_<X> = X extends readonly unknown[] ? [...X] : never

export interface UnknownFunction extends CustomUnknownFunction<{}> {
	<
		Args extends InferableTupleLike | SchemaLike<readonly unknown[]>,
		R extends Schemable,
	>(
		argumentsSchema: Args,
		resultSchema: R,
		// eslint-disable-next-line @typescript-eslint/ban-types
	): Function<(...args: _MakeArrayMutable_<$OutputType<Args>>) => OutputType<R>>
}
