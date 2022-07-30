// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownFunctionOptions } from '~'
import { CustomUnknownFunctionImpl, defaultUnknownFunctionOptions } from '~'

export class UnknownFunctionImpl extends CustomUnknownFunctionImpl<DefaultUnknownFunctionOptions> {
	constructor() {
		super(defaultUnknownFunctionOptions)
	}
}
