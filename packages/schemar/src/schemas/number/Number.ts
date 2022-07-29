// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyValue } from '@voltiso/util'

import type { CustomNumber } from '~'
import { NumberImpl } from '~'
import type * as s from '~/schemas'

export const Number = NumberImpl as unknown as NumberConstructor

export interface Number extends CustomNumber<{}> {
	<L extends number>(...literals: L[]): s.Literal<L>
	<L extends number>(literals: Set<L>): s.Literal<L>
	<L extends number>(...args: L[] | [Set<L>]): s.Literal<L>
}

type NumberConstructor = new () => Number

//

// eslint-disable-next-line no-new-wrappers
export const number: s.Number = lazyValue(() => new Number())
export const integer = lazyValue(() => number.integer)
