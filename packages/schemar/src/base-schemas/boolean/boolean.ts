// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomBoolean, Literal } from '~'

import { BooleanImpl } from './BooleanImpl'

//

interface Boolean_ extends CustomBoolean<{}> {
	<L extends boolean>(...literals: L[]): Literal<L>
	<L extends boolean>(literals: Set<L>): Literal<L>
	<L extends boolean>(...args: L[] | [Set<L>]): Literal<L>
}

const Boolean_ = lazyConstructor(
	() => BooleanImpl,
) as unknown as BooleanConstructor

export { Boolean_ as Boolean }

//

export type BooleanConstructor = new () => Boolean_

//

export const boolean: Boolean_ = lazyValue(() => new Boolean_())
