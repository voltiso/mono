// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { UnknownImpl } from '~'

export type Unknown = t.Unknown
export const Unknown = lazyConstructor(
	() => UnknownImpl,
) as unknown as t.UnknownConstructor

export const unknown = lazyValue(() => new Unknown())
