// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { NumberImpl } from './_'

//

export type Number_ = t.Number

export const Number_ = lazyConstructor(
	() => NumberImpl,
) as unknown as t.NumberConstructor

export { Number_ as Number }

export const number: t.Number = lazyValue(() => new Number_()) as never
export const integer: t.Integer = lazyValue(() => number.integer) as never
