// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { StringImpl } from './_'

export type String = t.String

export const String = lazyConstructor(
	() => StringImpl,
) as unknown as t.StringConstructor

// eslint-disable-next-line no-new-wrappers, @typescript-eslint/ban-types
export const string: String = lazyValue(() => new String())

export const regex = (
	regExp: RegExp,
	expectedDescription?: string | undefined,
) => string.regex(regExp, expectedDescription)
