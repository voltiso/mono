// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetDeepShape_ } from '~'
import type { ObjectType_ } from '~/GetType'
import type { InferableObjectLike } from '~/Inferable'

import type { CustomObject } from './CustomObject'

export type Object<Shape extends InferableObjectLike> = CustomObject<{
	shape: Shape
	deepShape: GetDeepShape_<Shape>
	Output: ObjectType_<Shape, { kind: 'out' }>
	Input: ObjectType_<Shape, { kind: 'in' }>
}>

export type ObjectConstructor = new <Shape extends InferableObjectLike>(
	shape: Shape,
	// eslint-disable-next-line @typescript-eslint/ban-types
) => Object<Shape>
