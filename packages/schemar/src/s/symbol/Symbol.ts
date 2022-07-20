// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyValue } from '@voltiso/util'

import type { Literal_ } from '../literal'
import type { DefaultSymbolOptions } from './_/SymbolOptions.js'
import type { CustomSymbol } from './CustomSymbol.js'
import { Symbol_ } from './Symbol_.js'

export interface Symbol extends CustomSymbol<DefaultSymbolOptions> {
	<L extends symbol>(...literals: L[]): Literal_<L>
	<L extends symbol>(literals: Set<L>): Literal_<L>
	<L extends symbol>(...args: L[] | [Set<L>]): Literal_<L>
}
export const Symbol = Symbol_ as unknown as SymbolConstructor

type SymbolConstructor = new () => Symbol

//

export const symbol = lazyValue(() => new Symbol())
