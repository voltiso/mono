// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { $$Schema, Schema, Schema$ } from '~'

export interface $$UnknownObject extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownObject'
}

export interface IUnknownObject extends $$UnknownObject, Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownObject'
}

export interface IUnknownObject$ extends $$UnknownObject, Schema$ {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownObject'
}

export function isUnknownObjectSchema(x: unknown): x is IUnknownObject$ {
	return (x as IUnknownObject | null)?.[SCHEMA_NAME] === 'UnknownObject'
}

export function is$$UnknownObjectSchema(x: unknown): x is $$UnknownObject {
	return isUnknownObjectSchema(x)
}
