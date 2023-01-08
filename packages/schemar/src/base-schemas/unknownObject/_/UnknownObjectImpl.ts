// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { defaultSchemaOptions } from '~'

import { CustomUnknownObjectImpl } from './CustomUnknownObjectImpl'

export class UnknownObjectImpl extends lazyConstructor(
	() => CustomUnknownObjectImpl,
)<{}> {
	constructor() {
		super(defaultSchemaOptions as never)
	}
}
