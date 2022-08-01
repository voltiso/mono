// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	CustomUnknownFunction,
	Function,
	GetOutputType,
	InferableReadonlyTuple,
	ISchema,
	Schemable,
} from '~'
import { UnknownFunctionImpl } from '~'

type MakeMutable<X> = X extends readonly unknown[] ? [...X] : X

export interface UnknownFunction extends CustomUnknownFunction<{}> {
	<
		Args extends InferableReadonlyTuple | ISchema<readonly unknown[]>,
		R extends Schemable,
	>(
		argumentsSchema: Args,
		resultSchema: R,
		// eslint-disable-next-line @typescript-eslint/ban-types
	): Function<(...args: MakeMutable<GetOutputType<Args>>) => GetOutputType<R>>
}

export const UnknownFunction = lazyConstructor(
	() => UnknownFunctionImpl,
) as unknown as UnknownFunctionConstructor

type UnknownFunctionConstructor = new () => UnknownFunction

//

const function_: UnknownFunction = lazyValue(() => new UnknownFunction())

export { function_ as function }
