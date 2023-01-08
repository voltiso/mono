// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownSchemaOptions } from '~'

import { CustomSchemaInferrerImpl } from './CustomSchemaInferrerImpl'
import { defaultSchemaInferrerOptions } from './defaultSchemaInferrerOptions'

export class SchemaInferrerImpl extends CustomSchemaInferrerImpl<DefaultUnknownSchemaOptions> {
	constructor() {
		super(defaultSchemaInferrerOptions)
	}
}
