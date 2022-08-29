// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomObjectImpl, defaultObjectOptions } from '~'

export class ObjectImpl<I extends InferableObject> extends lazyConstructor(
	() => CustomObjectImpl,
)<never> {
	constructor(shape: I) {
		super({ ...defaultObjectOptions, shape } as never)
	}
}
