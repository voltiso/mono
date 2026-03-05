// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema$ } from '~'

import type { UnknownSchemaOptions } from './UnknownSchemaOptions'

// export interface CustomSchemaInferrer<O extends Partial<UnknownSchemaOptions>>
// 	extends CustomSchema<O> {
// 	//
// 	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'SchemaInferrer'
// }

//

export interface CustomSchemaInferrer$<O extends Partial<UnknownSchemaOptions>>
	extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'SchemaInferrer'
}
