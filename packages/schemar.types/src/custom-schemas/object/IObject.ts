// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type {
	$$InferableObject,
	$$Schema,
	DefaultObjectOptions,
	ISchema,
	ObjectOptions,
} from '~'

export interface $$Object extends $$Schema {
	readonly [SCHEMA_NAME]: 'Object'
}

export interface IObject<T extends object = object>
	extends $$Object,
		ISchema<T> {
	//
	readonly [SCHEMA_NAME]: 'Object'

	readonly [OPTIONS]: ObjectOptions<T>
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions

	get getShape(): {} // InferableObjectLike
	get getDeepShape(): {} // InferableObjectLike

	and<S extends $$Schema>(
		other: S,
	): S extends $$InferableObject | $$Object ? $$Object : $$Schema

	get partial(): $$Object
	get strictPartial(): $$Object

	get deepPartial(): $$Object
	get deepStrictPartial(): $$Object
}

export function isObject(x: unknown): x is IObject {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IObject | null)?.[SCHEMA_NAME] === 'Object'
}
