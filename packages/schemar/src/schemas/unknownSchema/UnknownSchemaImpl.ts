// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CustomUnknownSchemaImpl } from './CustomUnknownSchemaImpl'
import type { DefaultUnknownSchemaOptions } from './UnknownSchemaOptions'
import { defaultUnknownSchemaOptions } from './UnknownSchemaOptions'

export class UnknownSchemaImpl extends CustomUnknownSchemaImpl<DefaultUnknownSchemaOptions> {
	constructor() {
		super(defaultUnknownSchemaOptions)
	}
}
