// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomBigint, CustomBigint$, Literal } from '~'

import { BigintImpl } from './BigintImpl'

//

export interface Bigint extends CustomBigint<{}> {
}

export interface Bigint$ extends CustomBigint$<{}> {
	<L extends bigint>(...literals: L[]): Literal<L>
	<L extends bigint>(literals: Set<L>): Literal<L>
	<L extends bigint>(...args: L[] | [Set<L>]): Literal<L>
}

//

export const Bigint$ = lazyConstructor(
	() => BigintImpl,
) as unknown as Bigint$Constructor

//

export type Bigint$Constructor = new () => Bigint$

//

export const bigint = lazyValue(() => new Bigint$())
