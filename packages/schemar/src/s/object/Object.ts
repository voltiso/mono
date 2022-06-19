/* eslint-disable @typescript-eslint/ban-types */
import { lazyConstructor } from '@voltiso/ts-util/class'
import { GetObjectType_ } from '../../GetType'
import { InferableObject } from '../../schema'
import { CustomObject } from './CustomObject'
import { Object_ } from './Object_'
import { DefaultObjectOptions } from './_/ObjectOptions'

export type Object<Shape extends InferableObject> = CustomObject<
	DefaultObjectOptions & {
		shape: Shape
		_out: GetObjectType_<Shape, { kind: 'out' }>
		_in: GetObjectType_<Shape, { kind: 'in' }>
	}
>

export const Object = lazyConstructor(
	() => Object_
) as unknown as ObjectConstructor

type ObjectConstructor = new <Shape extends InferableObject>(
	shape: Shape
) => Object<Shape>
