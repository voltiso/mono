// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Simple } from '@voltiso/util'
import { isSet } from '@voltiso/util'

import type { DefaultLiteralOptions } from '~'
import {
	type InferableLiteral,
	CustomLiteralImpl,
	defaultLiteralOptions,
} from '~'

export class LiteralImpl<L extends InferableLiteral> extends CustomLiteralImpl<
	Merge2Simple<DefaultLiteralOptions, { values: Set<L>; Output: L; Input: L }>
> {
	constructor(...args: [Set<L>] | L[]) {
		const values = isSet(args[0]) ? args[0] : new Set(args as L[])
		super({ ...defaultLiteralOptions, values } as never)
	}
}
