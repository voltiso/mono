// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultStringOptions } from '../defaultStringOptions'
import { CustomStringImpl } from './CustomStringImpl'

export class StringImpl extends CustomStringImpl<{}> {
	constructor() {
		super(defaultStringOptions)
	}
}
