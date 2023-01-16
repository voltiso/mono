// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomNumber, CustomNumber$, Literal$ } from '~'
import { NumberImpl } from '~'

//

interface Number_ extends CustomNumber<{}> {}
export type { Number_ as Number }

export interface Number$ extends CustomNumber$<{}> {
	<L extends number>(...literals: L[]): Literal$<L>
	<L extends number>(literals: Set<L>): Literal$<L>
	<L extends number>(...args: L[] | [Set<L>]): Literal$<L>

	//

	get Final(): Number_
}

const Number$ = lazyConstructor(
	() => NumberImpl,
) as unknown as Number$Constructor

export type Number$Constructor = new () => Number$

//

export interface Integer extends CustomNumber<{ isInteger: true }> {}
export interface Integer$ extends CustomNumber$<{ isInteger: true }> {}

//

export const number: Number$ = lazyValue(() => new Number$()) as never
export const integer: Integer$ = lazyValue(() => number.integer) as never
