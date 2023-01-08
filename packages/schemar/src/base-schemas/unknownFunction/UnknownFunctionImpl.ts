// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultUnknownFunctionOptions } from '~'

import { CustomUnknownFunctionImpl } from './CustomUnknownFunctionImpl'
import { defaultUnknownFunctionOptions } from './defaultUnknownFunctionOptions'

export class UnknownFunctionImpl extends lazyConstructor(
	() => CustomUnknownFunctionImpl,
)<DefaultUnknownFunctionOptions> {
	constructor() {
		super(defaultUnknownFunctionOptions)
	}
}
