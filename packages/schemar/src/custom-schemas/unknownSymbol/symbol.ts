// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { SymbolImpl } from '~'

export type UnknownSymbol = t.UnknownSymbol

export const UnknownSymbol = lazyConstructor(
	() => SymbolImpl,
) as unknown as t.UnknownSymbolConstructor

//

export const symbol = lazyValue(() => new UnknownSymbol())
