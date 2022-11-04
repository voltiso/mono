// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import type { Literal } from '~/core-schemas'
import { literal } from '~/core-schemas'

import { defaultNumberOptions } from '../defaultNumberOptions'
import { CustomNumberImpl } from './CustomNumberImpl'

export class NumberImpl extends lazyConstructor(() => CustomNumberImpl)<{}> {
	constructor() {
		super(defaultNumberOptions as never)

		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends number>(...args: L[] | [Set<L>]): Literal<L> {
		return literal<L>(...args)
	}
}
