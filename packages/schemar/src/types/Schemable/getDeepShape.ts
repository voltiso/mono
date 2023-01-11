// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as util from '@voltiso/util'

import type { $$Schema } from '~'
import { isObjectSchema, isTupleSchema } from '~'

import type { $$Schemable } from './Schemable'
import type { SchemableWithShape } from './SchemableWithShape'

export type GetShape_<S> = S extends $$Schema
	? S extends { getShape: unknown }
		? S['getShape']
		: never
	: S

export type GetShape<S extends SchemableWithShape> = GetShape_<S>

//

export type GetDeepShape_<S> = S extends { readonly getShape: {} }
	? GetDeepShape.Rec<S['getShape']>
	: S

export namespace GetDeepShape {
	export type Rec<S> = {
		[k in keyof S]: GetDeepShape_<S[k]>
	}
}

//

export function getDeepShape<S extends $$Schemable>(
	schemable: S,
): GetDeepShape_<S> {
	const shape =
		isObjectSchema(schemable) || isTupleSchema(schemable)
			? schemable.getShape
			: schemable

	if (Array.isArray(shape)) {
		return shape.map(value => getDeepShape(value) as never) as never
	} else if (util.isObject(shape)) {
		return Object.fromEntries(
			Object.entries(shape).map(([key, value]) => [key, getDeepShape(value)]),
		) as never
	} else return schemable as never
}
