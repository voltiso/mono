// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultUnknownSymbolOptions } from '~'

import { defaultUnknownSymbolOptions } from '../defaultUnknownSymbolOptions'
import { CustomUnknownSymbolImpl } from './CustomUnknownSymbolImpl'

export class SymbolImpl extends lazyConstructor(
	() => CustomUnknownSymbolImpl,
)<DefaultUnknownSymbolOptions> {
	constructor() {
		super(defaultUnknownSymbolOptions as never)
	}
}
