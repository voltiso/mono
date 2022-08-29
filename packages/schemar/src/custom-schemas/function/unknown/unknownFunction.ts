// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { UnknownFunctionImpl } from './UnknownFunctionImpl'

export type UnknownFunction = t.UnknownFunction

export const UnknownFunction = lazyConstructor(
	() => UnknownFunctionImpl,
) as unknown as UnknownFunctionConstructor

type UnknownFunctionConstructor = new () => UnknownFunction

//

const function_: UnknownFunction = lazyValue(() => new UnknownFunction())

export { function_ as function }
