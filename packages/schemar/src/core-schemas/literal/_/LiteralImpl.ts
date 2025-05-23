// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isSet, lazyConstructor } from '@voltiso/util'

import type { InferableLiteral } from '~'

import { defaultLiteralOptions } from '../defaultLiteralOptions'
import { CustomLiteralImpl } from './CustomLiteralImpl'

export class LiteralImpl<L extends InferableLiteral> extends lazyConstructor(
	() => CustomLiteralImpl,
)<{}> {
	constructor(...args: [Set<L>] | L[]) {
		const values = isSet(args[0]) ? args[0] : new Set(args as L[])
		super({ ...defaultLiteralOptions, values } as never)
	}
}
