// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultNeverOptions } from '@voltiso/schemar.types'

import { defaultNeverOptions } from '../defaultNeverOptions'
import { CustomNeverImpl } from './CustomNeverImpl'

export class NeverImpl extends CustomNeverImpl<DefaultNeverOptions> {
	constructor() {
		super(defaultNeverOptions as never)
	}
}
