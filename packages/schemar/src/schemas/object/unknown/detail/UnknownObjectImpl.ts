// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CustomUnknownObjectImpl, defaultSchemaOptions } from '~'

export class UnknownObjectImpl extends CustomUnknownObjectImpl<{}> {
	constructor() {
		super(defaultSchemaOptions as never)
	}
}
