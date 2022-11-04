// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownLiteralOptions } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { defaultUnknownLiteralOptions } from '../defaultUnknownLiteralOptions'
import { CustomUnknownLiteralImpl } from './CustomUnknownLiteralImpl'

export class UnknownLiteralImpl extends lazyConstructor(
	() => CustomUnknownLiteralImpl,
)<DefaultUnknownLiteralOptions> {
	constructor() {
		super(defaultUnknownLiteralOptions)
	}
}
