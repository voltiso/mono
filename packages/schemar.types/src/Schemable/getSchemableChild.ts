// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '_'

import type { ArrayLike, InferableObjectLike, InferableTupleLike } from '~'
import type { ObjectLike } from '~/custom-schemas/object'
import { isObject } from '~/custom-schemas/object'
import { isTuple } from '~/custom-schemas/tuple'
import type { SchemaLike } from '~/Schema'

export type GetShape_<S> = S extends SchemaLike
	? S extends { [OPTIONS]: { shape: any } }
		? S[OPTIONS]['shape']
		: never
	: S

export type SchemableWithShape =
	| ObjectLike
	| ArrayLike
	| InferableTupleLike
	| InferableObjectLike

export type GetShape<S extends SchemableWithShape> = GetShape_<S>

export function getSchemableChild<
	S extends SchemableWithShape,
	Child extends keyof GetShape<S>,
>(s: S, child: Child): GetShape<S>[Child] {
	// assertNotPolluting(child)
	if (isObject(s) || isTuple(s)) {
		return s.getShape[child as never] as never
	} else {
		return s[child as never]
	}
}
