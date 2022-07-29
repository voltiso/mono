// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownLiteralOptions } from '~'
import { CustomUnknownLiteralImpl, defaultUnknownLiteralOptions } from '~'

export class UnknownLiteralImpl extends CustomUnknownLiteralImpl<DefaultUnknownLiteralOptions> {
	constructor() {
		super(defaultUnknownLiteralOptions)
	}
}
