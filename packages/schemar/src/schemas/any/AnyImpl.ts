// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomAnyImpl, defaultAnyOptions } from '~'

export class AnyImpl extends lazyConstructor(() => CustomAnyImpl)<{}> {
	constructor() {
		super(defaultAnyOptions)
	}
}
