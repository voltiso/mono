// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultBooleanOptions } from '~'
import { CustomBooleanImpl, defaultBooleanOptions } from '~'

export class BooleanImpl extends CustomBooleanImpl<DefaultBooleanOptions> {
	constructor() {
		super(defaultBooleanOptions as never)
	}
}
