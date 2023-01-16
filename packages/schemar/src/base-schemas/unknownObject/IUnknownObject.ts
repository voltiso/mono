// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { $$Schema, ISchema, ISchema$ } from '~'

export interface $$UnknownObject extends $$Schema {
	readonly [SCHEMA_NAME]: 'UnknownObject'
}

export interface IUnknownObject extends $$UnknownObject, ISchema {
	readonly [SCHEMA_NAME]: 'UnknownObject'
}

export interface IUnknownObject$ extends $$UnknownObject, ISchema$ {
	readonly [SCHEMA_NAME]: 'UnknownObject'
}

export function isUnknownObjectSchema(x: unknown): x is IUnknownObject$ {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownObject | null)?.[SCHEMA_NAME] === 'UnknownObject'
}

export function is$$UnknownObjectSchema(x: unknown): x is $$UnknownObject {
	return isUnknownObjectSchema(x)
}
