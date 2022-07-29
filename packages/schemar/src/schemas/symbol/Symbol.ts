// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyValue } from '@voltiso/util'

import type { CustomSymbol, LiteralImpl } from '~'
import { Symbol_ } from '~'

export interface Symbol extends CustomSymbol<{}> {
	<L extends symbol>(...literals: L[]): LiteralImpl<L>
	<L extends symbol>(literals: Set<L>): LiteralImpl<L>
	<L extends symbol>(...args: L[] | [Set<L>]): LiteralImpl<L>
}
export const Symbol = Symbol_ as unknown as SymbolConstructor

type SymbolConstructor = new () => Symbol

//

export const symbol = lazyValue(() => new Symbol())
