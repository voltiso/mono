// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownFunctionOptions } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomUnknownFunctionImpl, defaultUnknownFunctionOptions } from '~'

export class UnknownFunctionImpl extends lazyConstructor(
	() => CustomUnknownFunctionImpl,
)<DefaultUnknownFunctionOptions> {
	constructor() {
		super(defaultUnknownFunctionOptions)
	}
}
