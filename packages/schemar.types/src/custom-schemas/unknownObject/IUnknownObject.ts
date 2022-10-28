// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { $$Schema, ISchema } from '~'

export interface $$UnknownObject extends $$Schema {
	readonly [SCHEMA_NAME]: 'UnknownObject'
}

export interface IUnknownObject extends $$UnknownObject, ISchema {
	readonly [SCHEMA_NAME]: 'UnknownObject'

	// readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions
	// readonly [BASE_OPTIONS]: DefaultUnknownObjectOptions
}

export function isUnknownObject(x: unknown): x is IUnknownObject {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownObject | null)?.[SCHEMA_NAME] === 'UnknownObject'
}
