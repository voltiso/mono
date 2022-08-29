import type { ObjectType_ } from '~/GetType'
import type { InferableObjectLike } from '~/Inferable'
import type { CustomObject } from './CustomObject'

export type Object<Shape extends InferableObjectLike> = CustomObject<{
	shape: Shape
	Output: ObjectType_<Shape, { kind: 'out' }>
	Input: ObjectType_<Shape, { kind: 'in' }>
}>

export type ObjectConstructor = new <Shape extends InferableObjectLike>(
	shape: Shape,
) => Object<Shape>
