// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type {
	CustomUnknownFunction,
	GetOutputType,
	InferableReadonlyTuple,
	ISchema,
	Schemable,
} from '~'
import * as s from '~'

export interface UnknownFunction extends CustomUnknownFunction<{}> {
	<
		Args extends InferableReadonlyTuple | ISchema<readonly unknown[]>,
		R extends Schemable,
	>(
		argumentsSchema: Args,
		resultSchema: R,
	): s.Function<(...args: GetOutputType<Args>) => GetOutputType<R>>
}

export const UnknownFunction =
	s.UnknownFunctionImpl as unknown as UnknownFunctionConstructor

type UnknownFunctionConstructor = new () => UnknownFunction

//

const function_: UnknownFunction = lazyValue(() => new UnknownFunction())

export { function_ as function }
