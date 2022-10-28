// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetDeepShape_ } from '~'
import type { InputType_, ObjectType_ } from '~/GetType'
import type { $$InferableObject } from '~/Inferable'

import type { CustomObject } from './CustomObject'

export interface Object<Shape extends $$InferableObject>
	extends CustomObject<{
		shape: Shape
		deepShape: GetDeepShape_<Shape>
		Output: ObjectType_<Shape, { kind: 'out' }>
		Input: ObjectType_<Shape, { kind: 'in' }>
	}> {}

export type ImplicitObject<Shape extends $$InferableObject> =
	object extends InputType_<Shape>
		? AutoCreatedObject<Shape>
		: // eslint-disable-next-line @typescript-eslint/ban-types
		  Object<Shape>

export interface AutoCreatedObject<
	Shape extends $$InferableObject,
> extends CustomObject<{
		shape: Shape
		deepShape: GetDeepShape_<Shape>
		Output: ObjectType_<Shape, { kind: 'out' }>
		Input: ObjectType_<Shape, { kind: 'in' }>

		hasDefault: true
		default: {}
	}> {}

export type ObjectConstructor = new <Shape extends $$InferableObject>(
	shape: Shape,
	// eslint-disable-next-line @typescript-eslint/ban-types
) => Object<Shape>
