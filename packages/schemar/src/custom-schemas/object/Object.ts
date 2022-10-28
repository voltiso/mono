// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { ObjectImpl } from '~'

export type Object<Shape extends t.$$InferableObject> = t.Object<Shape>

export const Object = lazyConstructor(
	() => ObjectImpl,
) as unknown as t.ObjectConstructor
