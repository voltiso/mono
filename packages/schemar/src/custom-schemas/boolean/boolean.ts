// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { BooleanImpl } from './BooleanImpl'

type Boolean_ = t.Boolean

const Boolean_ = lazyConstructor(
	() => BooleanImpl,
) as unknown as t.BooleanConstructor

export { Boolean_ as Boolean }

export const boolean: Boolean_ = lazyValue(() => new Boolean_())
