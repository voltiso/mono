// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { UnknownOptions } from '~'

import { CustomUnknownImpl } from './CustomUnknownImpl'
import { defaultUnknownOptions } from './defaultUnknownOptions'

export class UnknownImpl extends lazyConstructor(
	() => CustomUnknownImpl,
)<UnknownOptions.Default> {
	constructor() {
		super(defaultUnknownOptions)
	}
}
