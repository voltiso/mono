// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomString, Literal } from '~'
import { StringImpl } from '~'

export interface String extends CustomString<{}> {
	<L extends string>(...literals: L[]): Literal<L>
	<L extends string>(literals: Set<L>): Literal<L>
	<L extends string>(...args: L[] | [Set<L>]): Literal<L>
}

// eslint-disable-next-line @typescript-eslint/ban-types
type StringConstructor = new () => String

export const String = lazyConstructor(
	() => StringImpl,
) as unknown as StringConstructor

// eslint-disable-next-line no-new-wrappers, @typescript-eslint/ban-types
export const string: String = lazyValue(() => new String())
