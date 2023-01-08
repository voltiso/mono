// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomUnknownSymbol, Literal } from '~'

import { SymbolImpl } from './_'

export interface UnknownSymbol extends CustomUnknownSymbol<{}> {
	<L extends symbol>(...literals: L[]): Literal<L>
	<L extends symbol>(literals: Set<L>): Literal<L>
	<L extends symbol>(...args: L[] | [Set<L>]): Literal<L>
}

export type UnknownSymbolConstructor = new () => UnknownSymbol

//

export const UnknownSymbol = lazyConstructor(
	() => SymbolImpl,
) as unknown as UnknownSymbolConstructor

//

export const symbol = lazyValue(() => new UnknownSymbol())
