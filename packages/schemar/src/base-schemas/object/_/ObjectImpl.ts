// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { InferableObject } from '~'

import { defaultObjectOptions } from '../defaultObjectOptions'
import { CustomObjectImpl } from './CustomObjectImpl'

export class ObjectImpl<I extends InferableObject> extends lazyConstructor(
	() => CustomObjectImpl,
)<never> {
	constructor(shape: I) {
		super({ ...defaultObjectOptions, shape } as never)
	}
}
