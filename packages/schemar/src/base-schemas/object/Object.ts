// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type {
	$$InferableObject,
	CustomObject,
	GetDeepShape_,
	GetObjectType,
	Input_,
} from '~'

import { ObjectImpl } from './_'

export interface Object<Shape extends $$InferableObject>
	extends CustomObject<{
		shape: Shape
		deepShape: GetDeepShape_<Shape>
		Output: GetObjectType<Shape, { kind: 'out'; isPlain: false }>
		Input: GetObjectType<Shape, { kind: 'in'; isPlain: false }>
	}> {}

export type ImplicitObject<Shape extends $$InferableObject> =
	object extends Input_<Shape>
		? AutoCreatedObject<Shape>
		: // eslint-disable-next-line @typescript-eslint/ban-types
		  Object<Shape>

export interface AutoCreatedObject<Shape extends $$InferableObject>
	extends CustomObject<{
		shape: Shape
		deepShape: GetDeepShape_<Shape>
		Output: GetObjectType<Shape, { kind: 'out'; isPlain: false }>
		Input: GetObjectType<Shape, { kind: 'in'; isPlain: false }>

		hasDefault: true
		default: {}
	}> {}

export type ObjectConstructor = new <Shape extends $$InferableObject>(
	shape: Shape,
	// eslint-disable-next-line @typescript-eslint/ban-types
) => Object<Shape>

//

export const Object = lazyConstructor(
	() => ObjectImpl,
) as unknown as ObjectConstructor
