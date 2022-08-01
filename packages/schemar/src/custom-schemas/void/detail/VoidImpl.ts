// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomVoidImpl, defaultVoidOptions } from '~'

export class VoidImpl extends lazyConstructor(() => CustomVoidImpl)<{}> {
	constructor() {
		super(defaultVoidOptions as never)
	}
}
