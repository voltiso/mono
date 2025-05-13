// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { UnknownSymbolOptions } from '~'

import { defaultUnknownSymbolOptions } from '../defaultUnknownSymbolOptions'
import { CustomUnknownSymbolImpl } from './CustomUnknownSymbolImpl'

export class SymbolImpl extends lazyConstructor(
	() => CustomUnknownSymbolImpl,
)<UnknownSymbolOptions.Default> {
	constructor() {
		super(defaultUnknownSymbolOptions as never)
	}
}
