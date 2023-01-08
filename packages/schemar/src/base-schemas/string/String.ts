// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomString, Literal } from '~'

import { StringImpl } from './_'

interface String_ extends CustomString<{}> {
	<L extends string>(...literals: L[]): Literal<L>
	<L extends string>(literals: Set<L>): Literal<L>
	<L extends string>(...args: L[] | [Set<L>]): Literal<L>
}

export type StringConstructor = new () => String_

//

const String_ = lazyConstructor(
	() => StringImpl,
) as unknown as StringConstructor

export const string: String_ = lazyValue(() => new String_())

export { String_ as String }

export const regex = (
	regExp: RegExp,
	expectedDescription?: string | undefined,
) => string.regex(regExp, expectedDescription)
