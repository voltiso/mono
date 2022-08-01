// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultSymbolOptions } from '~'
import { CustomSymbolImpl, defaultSymbolOptions } from '~'

export class SymbolImpl extends lazyConstructor(
	() => CustomSymbolImpl,
)<DefaultSymbolOptions> {
	constructor() {
		super(defaultSymbolOptions as never)
	}
}
