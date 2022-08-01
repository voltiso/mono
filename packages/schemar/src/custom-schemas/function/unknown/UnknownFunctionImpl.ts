// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultUnknownFunctionOptions } from '~'
import { CustomUnknownFunctionImpl, defaultUnknownFunctionOptions } from '~'

export class UnknownFunctionImpl extends lazyConstructor(
	() => CustomUnknownFunctionImpl,
)<DefaultUnknownFunctionOptions> {
	constructor() {
		super(defaultUnknownFunctionOptions)
	}
}
