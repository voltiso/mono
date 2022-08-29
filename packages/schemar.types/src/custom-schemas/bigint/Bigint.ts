// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomBigint, Literal } from '~'

export interface Bigint extends CustomBigint<{}> {
	<L extends bigint>(...literals: L[]): Literal<L>
	<L extends bigint>(literals: Set<L>): Literal<L>
	<L extends bigint>(...args: L[] | [Set<L>]): Literal<L>
}

export type BigintConstructor = new () => Bigint
