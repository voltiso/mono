// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyConstructor } from '@voltiso/util'

import type { GetObjectType_ } from '../../GetType'
import type { InferableObject } from '../../schema'
import type { DefaultObjectOptions } from './_/ObjectOptions.js'
import type { CustomObject } from './CustomObject.js'
import { Object_ } from './Object_.js'

export type Object<Shape extends InferableObject> = CustomObject<
	DefaultObjectOptions & {
		shape: Shape
		_out: GetObjectType_<Shape, { kind: 'out' }>
		_in: GetObjectType_<Shape, { kind: 'in' }>
	}
>

export const Object = lazyConstructor(
	() => Object_,
) as unknown as ObjectConstructor

type ObjectConstructor = new <Shape extends InferableObject>(
	shape: Shape,
) => Object<Shape>
