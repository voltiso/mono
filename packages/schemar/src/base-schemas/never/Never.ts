// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { CustomNeverImpl } from '.'

export type Never = t.Never

export const Never = lazyConstructor(
	() => CustomNeverImpl,
) as unknown as t.NeverConstructor

export const never = lazyValue(() => new Never())
