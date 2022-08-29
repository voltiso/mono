// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownSchemaOptions } from '@voltiso/schemar.types'
import { CustomUnknownSchemaImpl } from './CustomUnknownSchemaImpl'
import { defaultUnknownSchemaOptions } from './defaultUnknownSchemaOptions'

export class UnknownSchemaImpl extends CustomUnknownSchemaImpl<DefaultUnknownSchemaOptions> {
	constructor() {
		super(defaultUnknownSchemaOptions)
	}
}
