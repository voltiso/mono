// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultUnknownOptions } from '~'

import { CustomUnknownImpl } from './CustomUnknownImpl'
import { defaultUnknownOptions } from './defaultUnknownOptions'

export class UnknownImpl extends lazyConstructor(
	() => CustomUnknownImpl,
)<DefaultUnknownOptions> {
	constructor() {
		super(defaultUnknownOptions)
	}
}
