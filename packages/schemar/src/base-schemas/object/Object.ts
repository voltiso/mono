// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAlmostSame } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type { $$InferableObject } from '~/types/Inferable/Inferable'

import { ObjectImpl } from './_/ObjectImpl'
import type { CustomObject, CustomObject$ } from './CustomObject'

//

interface Object_<T> extends CustomObject<{
	Output: IsAlmostSame<T, {}> extends true ? object : T
	Input: IsAlmostSame<T, {}> extends true ? object : T
}> {}

export type { Object_ as Object }

export interface Object$<T> extends CustomObject$<{
	Output: IsAlmostSame<T, {}> extends true ? object : T
	Input: IsAlmostSame<T, {}> extends true ? object : T
}> {
	//
	get Final(): Object_<T>
}

//

export type Object$Constructor = new <Shape extends $$InferableObject>(
	shape: Shape,
) => Object$<Shape>

//

export const Object$ = lazyConstructor(
	() => ObjectImpl,
) as unknown as Object$Constructor
