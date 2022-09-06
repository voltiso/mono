// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Literal } from '~/custom-schemas'

import type { CustomNumber } from './CustomNumber'

export interface Number extends CustomNumber<{}> {
	<L extends number>(...literals: L[]): Literal<L>
	<L extends number>(literals: Set<L>): Literal<L>
	<L extends number>(...args: L[] | [Set<L>]): Literal<L>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type NumberConstructor = new () => Number
