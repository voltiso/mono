// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { UnknownObjectImpl } from './_/UnknownObjectImpl'

export type UnknownObject = t.UnknownObject

export const UnknownObject = lazyConstructor(
	() => UnknownObjectImpl,
) as unknown as t.UnknownObjectConstructor

export const object = lazyValue(() => new UnknownObject())
