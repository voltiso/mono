// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { Schema, Schema$ } from '~'

export interface ISchemaInferrer extends Schema {
	readonly [SCHEMA_NAME]: 'SchemaInferrer'
}

/** Typeof s.schema */
export interface ISchemaInferrer$ extends Schema$ {
	readonly [SCHEMA_NAME]: 'SchemaInferrer'
}

export function isSchemaInferrer(x: unknown): x is ISchemaInferrer$ {
	return (x as ISchemaInferrer | null)?.[SCHEMA_NAME] === 'SchemaInferrer'
}
