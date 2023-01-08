// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomNumber, Literal } from '~'

import { NumberImpl } from './_'

//

export interface Number_ extends CustomNumber<{}> {
	<L extends number>(...literals: L[]): Literal<L>
	<L extends number>(literals: Set<L>): Literal<L>
	<L extends number>(...args: L[] | [Set<L>]): Literal<L>
}

export { Number_ as Number }

export type NumberConstructor = new () => Number_

//

export interface Integer extends CustomNumber<{ isInteger: true }> {}

//

export const Number_ = lazyConstructor(
	() => NumberImpl,
) as unknown as NumberConstructor

export const number: Number_ = lazyValue(() => new Number_()) as never
export const integer: Integer = lazyValue(() => number.integer) as never
