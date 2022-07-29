// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyConstructor } from '@voltiso/util'

import type { CustomObject, GetObjectType_, InferableObject } from '~'
import { ObjectImpl } from '~'

export type Object<Shape extends InferableObject> = CustomObject<{
	shape: Shape
	Output: GetObjectType_<Shape, { kind: 'out' }>
	Input: GetObjectType_<Shape, { kind: 'in' }>
}>

export const Object = lazyConstructor(
	() => ObjectImpl,
) as unknown as ObjectConstructor

type ObjectConstructor = new <Shape extends InferableObject>(
	shape: Shape,
) => Object<Shape>
