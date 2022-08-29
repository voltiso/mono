// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomUnknownObjectImpl, defaultSchemaOptions } from '~'

export class UnknownObjectImpl extends lazyConstructor(
	() => CustomUnknownObjectImpl,
)<{}> {
	constructor() {
		super(defaultSchemaOptions as never)
	}
}
