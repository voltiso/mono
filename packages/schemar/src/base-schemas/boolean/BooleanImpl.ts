// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultBooleanOptions } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomBooleanImpl } from './CustomBooleanImpl'
import { defaultBooleanOptions } from './defaultBooleanOptions'

export class BooleanImpl extends lazyConstructor(
	() => CustomBooleanImpl,
)<DefaultBooleanOptions> {
	constructor() {
		super(defaultBooleanOptions as never)
	}
}
