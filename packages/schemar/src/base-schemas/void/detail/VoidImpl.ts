// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { defaultVoidOptions } from '../options/defaultVoidOptions'
import { CustomVoidImpl } from './CustomVoidImpl'

export class VoidImpl extends lazyConstructor(() => CustomVoidImpl)<{}> {
	constructor() {
		super(defaultVoidOptions as never)
	}
}
