// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomString, CustomString$, Literal$ } from '~'

import { StringImpl } from './_'

interface String_ extends CustomString<{}> {}
export type { String_ as String }

//

export interface String$ extends CustomString$<{}> {
	<L extends string>(...literals: L[]): Literal$<L>
	<L extends string>(literals: Set<L>): Literal$<L>
	<L extends string>(...args: L[] | [Set<L>]): Literal$<L>

	//

	get Final(): String_
}

//

const String$ = lazyConstructor(
	() => StringImpl,
) as unknown as String$Constructor

export type String$Constructor = new () => String$

//

export const string: String$ = lazyValue(() => new String$())

export const regex = (
	regExp: RegExp,
	expectedDescription?: string | undefined,
) => string.regex(regExp, expectedDescription)
