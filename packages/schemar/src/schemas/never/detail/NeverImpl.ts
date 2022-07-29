// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CustomNeverImpl } from './CustomNeverImpl'
import type { DefaultNeverOptions } from './NeverOptions'
import { defaultNeverOptions } from './NeverOptions'

export class NeverImpl extends CustomNeverImpl<DefaultNeverOptions> {
	constructor() {
		super(defaultNeverOptions as never)
	}
}
