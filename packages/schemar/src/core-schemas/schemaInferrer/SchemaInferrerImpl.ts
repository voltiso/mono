// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CustomSchemaInferrerImpl } from './CustomSchemaInferrerImpl'
import { defaultSchemaInferrerOptions } from './defaultSchemaInferrerOptions'
import type { UnknownSchemaOptions } from './UnknownSchemaOptions'

export class SchemaInferrerImpl extends CustomSchemaInferrerImpl<UnknownSchemaOptions.Default> {
	constructor() {
		super(defaultSchemaInferrerOptions)
	}
}
