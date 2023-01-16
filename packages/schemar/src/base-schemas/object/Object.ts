// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type { $$InferableObject, CustomObject, CustomObject$ } from '~'

import { ObjectImpl } from './_'

//

interface _Object<T>
	extends CustomObject<{
		Output: IsIdentical<T, {}> extends true ? object : T
		Input: IsIdentical<T, {}> extends true ? object : T
	}> {}

export type { _Object as Object }

export interface Object$<T>
	extends CustomObject$<{
		Output: IsIdentical<T, {}> extends true ? object : T
		Input: IsIdentical<T, {}> extends true ? object : T
	}> {
	//
	get Final(): _Object<T>
}

//

export type Object$Constructor = new <Shape extends $$InferableObject>(
	shape: Shape,
) => Object$<Shape>

//

export const Object$ = lazyConstructor(
	() => ObjectImpl,
) as unknown as Object$Constructor
