// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CustomVoidImpl, defaultVoidOptions } from '~'

export class VoidImpl extends CustomVoidImpl<{}> {
	constructor() {
		super(defaultVoidOptions as never)
	}
}
