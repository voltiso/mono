// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { UnknownFunctionOptions } from '~'

import { CustomUnknownFunctionImpl } from './CustomUnknownFunctionImpl'
import { defaultUnknownFunctionOptions } from './defaultUnknownFunctionOptions'

export class UnknownFunctionImpl extends lazyConstructor(
	() => CustomUnknownFunctionImpl,
)<UnknownFunctionOptions.Default> {
	constructor() {
		super(defaultUnknownFunctionOptions)
	}
}
