// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomUnknownRecordImpl } from './CustomUnknownRecordImpl'
import { defaultUnknownRecordOptions } from './defaultUnknownRecordOptions'

export class UnknownRecordImpl extends lazyConstructor(
	() => CustomUnknownRecordImpl,
)<{}> {
	constructor() {
		super(defaultUnknownRecordOptions as never)
	}
}
