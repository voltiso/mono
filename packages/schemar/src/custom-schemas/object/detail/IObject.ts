// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { type OPTIONS, SCHEMA_NAME } from '_'

import type { InferableObject, ISchema, ObjectOptions } from '~'

export interface IObject extends ISchema {
	readonly [SCHEMA_NAME]: 'Object'

	[OPTIONS]: ObjectOptions

	// readonly [BASE_OPTIONS]: ObjectOptions
	// readonly [DEFAULT_OPTIONS]: DefaultObjectOptions

	get getShape(): InferableObject

	get partial(): IObject
	get strictPartial(): IObject

	get deepPartial(): IObject
	get deepStrictPartial(): IObject
}

export function isObject(x: unknown): x is IObject {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IObject | null)?.[SCHEMA_NAME] === 'Object'
}
