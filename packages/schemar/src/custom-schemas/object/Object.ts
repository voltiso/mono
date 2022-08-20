// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyConstructor } from '@voltiso/util'

import type { CustomObject, ObjectType_, InferableObjectLike } from '~'
import { ObjectImpl } from '~'

export type Object<Shape extends InferableObjectLike> = CustomObject<{
	shape: Shape
	Output: ObjectType_<Shape, { kind: 'out' }>
	Input: ObjectType_<Shape, { kind: 'in' }>
}>

export const Object = lazyConstructor(
	() => ObjectImpl,
) as unknown as ObjectConstructor

type ObjectConstructor = new <Shape extends InferableObjectLike>(
	shape: Shape,
) => Object<Shape>
