// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { CustomSchema$ } from '~'

import type { UnknownSchemaOptions } from './UnknownSchemaOptions'

// export interface CustomSchemaInferrer<O extends Partial<UnknownSchemaOptions>>
// 	extends CustomSchema<O> {
// 	//
// 	readonly [SCHEMA_NAME]: 'SchemaInferrer'
// }

//

export interface CustomSchemaInferrer$<O extends Partial<UnknownSchemaOptions>>
	extends CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'SchemaInferrer'
}
