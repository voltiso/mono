// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomBoolean, Literal } from '~'

export interface Boolean extends CustomBoolean<{}> {
	<L extends boolean>(...literals: L[]): Literal<L>
	<L extends boolean>(literals: Set<L>): Literal<L>
	<L extends boolean>(...args: L[] | [Set<L>]): Literal<L>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type BooleanConstructor = new () => Boolean
