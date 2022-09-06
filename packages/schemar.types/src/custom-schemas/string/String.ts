// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Literal } from '~/custom-schemas'

import type { CustomString } from './CustomString'

export interface String extends CustomString<{}> {
	<L extends string>(...literals: L[]): Literal<L>
	<L extends string>(literals: Set<L>): Literal<L>
	<L extends string>(...args: L[] | [Set<L>]): Literal<L>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type StringConstructor = new () => String
