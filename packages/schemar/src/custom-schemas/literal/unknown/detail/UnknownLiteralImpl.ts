// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultUnknownLiteralOptions } from '~'
import { CustomUnknownLiteralImpl, defaultUnknownLiteralOptions } from '~'

export class UnknownLiteralImpl extends lazyConstructor(
	() => CustomUnknownLiteralImpl,
)<DefaultUnknownLiteralOptions> {
	constructor() {
		super(defaultUnknownLiteralOptions)
	}
}
