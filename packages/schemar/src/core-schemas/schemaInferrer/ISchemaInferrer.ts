// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema } from '~'

/** Typeof s.schema */
export interface ISchemaInferrer extends ISchema {
	readonly [SCHEMA_NAME]: 'SchemaInferrer'
}

export function isSchemaInferrer(x: unknown): x is ISchemaInferrer {
	// eslint-disable-next-line security/detect-object-injection
	return (x as ISchemaInferrer | null)?.[SCHEMA_NAME] === 'SchemaInferrer'
}
