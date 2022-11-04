// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownOptions } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomUnknownImpl } from './CustomUnknownImpl'
import { defaultUnknownOptions } from './defaultUnknownOptions'

export class UnknownImpl extends lazyConstructor(
	() => CustomUnknownImpl,
)<DefaultUnknownOptions> {
	constructor() {
		super(defaultUnknownOptions)
	}
}
