// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyFunction } from '@voltiso/util'

import type { CustomBoolean, CustomBoolean$, Literal } from '~'

import { BooleanImpl } from './BooleanImpl'

//

interface Boolean_ extends CustomBoolean<{}> {}
export type { Boolean_ as Boolean }

//

export interface Boolean$ extends CustomBoolean$<{}> {
	<L extends boolean>(...literals: L[]): Literal<L>
	<L extends boolean>(literals: Set<L>): Literal<L>
	<L extends boolean>(...args: L[] | [Set<L>]): Literal<L>
}

//

export const Boolean$ = lazyConstructor(
	() => BooleanImpl,
) as unknown as Boolean$Constructor

//

export type Boolean$Constructor = new () => Boolean$

//

export const boolean: Boolean$ = lazyFunction(() => new Boolean$())
