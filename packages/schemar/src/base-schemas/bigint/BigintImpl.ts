// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomBigintImpl } from './CustomBigintImpl'
import { defaultBigintOptions } from './defaultBigintOptions'

export class BigintImpl extends lazyConstructor(() => CustomBigintImpl)<{}> {
	constructor() {
		super(defaultBigintOptions as never)
	}
}
