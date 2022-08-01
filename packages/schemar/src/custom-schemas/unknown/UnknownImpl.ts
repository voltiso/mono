// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultUnknownOptions } from '~'
import { CustomUnknownImpl, defaultUnknownOptions } from '~'

export class UnknownImpl extends lazyConstructor(
	() => CustomUnknownImpl,
)<DefaultUnknownOptions> {
	constructor() {
		super(defaultUnknownOptions)
	}
}
