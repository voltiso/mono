// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { UnknownLiteralOptions } from '~'

import { defaultUnknownLiteralOptions } from '../defaultUnknownLiteralOptions'
import { CustomUnknownLiteralImpl } from './CustomUnknownLiteralImpl'

export class UnknownLiteralImpl extends lazyConstructor(
	() => CustomUnknownLiteralImpl,
)<UnknownLiteralOptions> {
	constructor() {
		super(defaultUnknownLiteralOptions)
	}
}
