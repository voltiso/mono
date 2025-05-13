// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomAnyImpl } from './CustomAnyImpl'
import { defaultAnyOptions } from './defaultAnyOptions'

export class AnyImpl extends lazyConstructor(() => CustomAnyImpl)<{}> {
	constructor() {
		super(defaultAnyOptions)
	}
}
