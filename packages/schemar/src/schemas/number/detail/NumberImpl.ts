// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL } from '@voltiso/util'

import { CustomNumberImpl, defaultNumberOptions } from '~'
import * as s from '~/schemas'

export class NumberImpl extends CustomNumberImpl<{}> {
	constructor() {
		super(defaultNumberOptions as never)
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends number>(...args: L[] | [Set<L>]): s.Literal<L> {
		return s.literal(...args)
	}
}
