// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomBoolean, Literal } from '~'
import { BooleanImpl } from '~'

export interface Boolean extends CustomBoolean<{}> {
	<L extends boolean>(...literals: L[]): Literal<L>
	<L extends boolean>(literals: Set<L>): Literal<L>
	<L extends boolean>(...args: L[] | [Set<L>]): Literal<L>
}

export const Boolean = lazyConstructor(
	() => BooleanImpl,
) as unknown as BooleanConstructor

type BooleanConstructor = new () => Boolean

// eslint-disable-next-line no-new-wrappers
export const boolean: Boolean = lazyValue(() => new Boolean())
