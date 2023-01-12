// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NeverOptions } from '~'

import { defaultNeverOptions } from '../defaultNeverOptions'
import { CustomNeverImpl } from './CustomNeverImpl'

export class NeverImpl extends CustomNeverImpl<NeverOptions.Default> {
	constructor() {
		super(defaultNeverOptions as never)
	}
}
