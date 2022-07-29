// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultObjectOptions, InferableObject } from '~'
import { CustomObjectImpl } from '~'

export class ObjectImpl<
	I extends InferableObject,
> extends CustomObjectImpl<never> {
	constructor(shape: I) {
		super({ ...defaultObjectOptions, shape } as never)
	}
}
