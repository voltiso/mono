// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '_'

import { isObject } from '~/custom-schemas/object'
import { isTuple } from '~/custom-schemas/tuple'
import type { SchemaLike } from '~/Schema'

import type { SchemableLike } from './Schemable'
import type { SchemableWithShape } from './SchemableWithShape'

export type GetShape_<S> = S extends SchemaLike
	? S extends { [OPTIONS]: { shape: any } }
		? S[OPTIONS]['shape']
		: never
	: S

export type GetShape<S extends SchemableWithShape> = GetShape_<S>

//

export type GetDeepShape_<S> = [S] extends [{ [OPTIONS]: { shape: any } }]
	? { [k in S[OPTIONS]['shape']]: GetDeepShape_<S[OPTIONS]['shape'][k]> }
	: S

//

export function getDeepShape<S extends SchemableLike>(
	schemable: S,
): GetDeepShape_<S> {
	const shape =
		isObject(schemable) || isTuple(schemable) ? schemable.getShape : schemable

	if (Array.isArray(shape)) {
		return shape.map(value => getDeepShape(value)) as never
	} else if (typeof shape === 'object' && shape !== null) {
		return Object.fromEntries(
			Object.entries(shape).map(([key, value]) => [key, getDeepShape(value)]),
		) as never
	} else return schemable
}
