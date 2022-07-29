// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultObjectOptions,
	InferableObject,
	ISchema,
	ObjectOptions,
} from '~'
import { SCHEMA_NAME } from '~'

export interface IObject extends ISchema {
	readonly [SCHEMA_NAME]: 'Object'

	readonly [BASE_OPTIONS]: ObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultObjectOptions

	get getShape(): InferableObject

	get partial(): IObject
	get deepPartial(): IObject
}

export function isObject(x: unknown): x is IObject {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IObject | null)?.[SCHEMA_NAME] === 'Object'
}
