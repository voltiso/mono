// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DEFAULT_OPTIONS } from '_'
import { type OPTIONS, SCHEMA_NAME } from '_'

import type {
	DefaultObjectOptions,
	InferableObjectLike,
	ISchema,
	ObjectOptions,
	SchemaLike,
} from '~'

export interface ObjectLike<T extends object = object> extends SchemaLike<T> {
	readonly [SCHEMA_NAME]: 'Object'
	get getShape(): any

	and(additionalFields: any): any
}

export interface IObject<T extends object = object> extends ISchema<T> {
	readonly [SCHEMA_NAME]: 'Object'

	readonly [OPTIONS]: ObjectOptions<T>
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions

	get getShape(): InferableObjectLike
	get getDeepShape(): InferableObjectLike

	and(additionalFields: InferableObjectLike | ObjectLike): any

	get partial(): any
	get strictPartial(): any

	get deepPartial(): any
	get deepStrictPartial(): any
}

export function isObject(x: unknown): x is IObject {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IObject | null)?.[SCHEMA_NAME] === 'Object'
}
