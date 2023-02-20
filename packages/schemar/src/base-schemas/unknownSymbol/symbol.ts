// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyFunction } from '@voltiso/util'

import type { CustomUnknownSymbol, Literal } from '~'

import { SymbolImpl } from './_'

export interface UnknownSymbol extends CustomUnknownSymbol<{}> {}

export interface UnknownSymbol$ extends CustomUnknownSymbol<{}> {
	<L extends symbol>(...literals: L[]): Literal<L>
	<L extends symbol>(literals: Set<L>): Literal<L>
	<L extends symbol>(...args: L[] | [Set<L>]): Literal<L>

	get Final(): UnknownSymbol
}

export type UnknownSymbol$Constructor = new () => UnknownSymbol$

//

export const UnknownSymbol$ = lazyConstructor(
	() => SymbolImpl,
) as unknown as UnknownSymbol$Constructor

//

export const symbol = lazyFunction(() => new UnknownSymbol$())
