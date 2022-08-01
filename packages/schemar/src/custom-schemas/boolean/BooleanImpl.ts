// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultBooleanOptions } from '~'
import { CustomBooleanImpl, defaultBooleanOptions } from '~'

export class BooleanImpl extends lazyConstructor(
	() => CustomBooleanImpl,
)<DefaultBooleanOptions> {
	constructor() {
		super(defaultBooleanOptions as never)
	}
}
