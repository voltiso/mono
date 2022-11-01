// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '@voltiso/util'
import * as util from '@voltiso/util'

import { isObject } from '~/custom-schemas/object'
import { isTuple } from '~/custom-schemas/tuple'
import type { $$Schema } from '~/Schema'

import type { $$Schemable } from './Schemable'
import type { SchemableWithShape } from './SchemableWithShape'

export type GetShape_<S> = S extends $$Schema
	? S extends { [OPTIONS]: { shape: unknown } }
		? S[OPTIONS]['shape']
		: never
	: S

export type GetShape<S extends SchemableWithShape> = GetShape_<S>

//

export type GetDeepShape_<S> = [S] extends [{ [OPTIONS]: { shape: {} } }]
	? { [k in keyof S[OPTIONS]['shape']]: GetDeepShape_<S[OPTIONS]['shape'][k]> }
	: S

//

export function getDeepShape<S extends $$Schemable>(
	schemable: S,
): GetDeepShape_<S> {
	const shape =
		isObject(schemable) || isTuple(schemable) ? schemable.getShape : schemable

	if (Array.isArray(shape)) {
		return shape.map(value => getDeepShape(value)) as never
	} else if (util.isObject(shape)) {
		return Object.fromEntries(
			Object.entries(shape).map(([key, value]) => [key, getDeepShape(value)]),
		) as never
	} else return schemable as never
}
