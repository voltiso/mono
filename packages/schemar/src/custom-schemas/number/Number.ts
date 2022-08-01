// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomNumber, Literal } from '~'
import { NumberImpl } from '~'

export const Number = lazyConstructor(
	() => NumberImpl,
) as unknown as NumberConstructor

export interface Number extends CustomNumber<{}> {
	<L extends number>(...literals: L[]): Literal<L>
	<L extends number>(literals: Set<L>): Literal<L>
	<L extends number>(...args: L[] | [Set<L>]): Literal<L>
}

type NumberConstructor = new () => Number

//

// eslint-disable-next-line no-new-wrappers
export const number: Number = lazyValue(() => new Number())
export const integer = lazyValue(() => number.integer)
