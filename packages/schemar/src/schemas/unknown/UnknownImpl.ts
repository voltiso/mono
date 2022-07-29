// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownOptions } from '~'
import { CustomUnknownImpl, defaultUnknownOptions } from '~'

export class UnknownImpl extends CustomUnknownImpl<DefaultUnknownOptions> {
	constructor() {
		super(defaultUnknownOptions)
	}
}
