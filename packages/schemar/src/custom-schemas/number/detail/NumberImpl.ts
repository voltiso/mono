// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { Literal } from '~'
import { CustomNumberImpl, defaultNumberOptions, literal } from '~'

export class NumberImpl extends lazyConstructor(() => CustomNumberImpl)<{}> {
	constructor() {
		super(defaultNumberOptions as never)

		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends number>(...args: L[] | [Set<L>]): Literal<L> {
		return literal(...args)
	}
}
