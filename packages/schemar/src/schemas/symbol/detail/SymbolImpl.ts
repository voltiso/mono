// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSymbolOptions } from '~'
import { defaultSymbolOptions, CustomSymbolImpl } from '~'

export class Symbol_ extends CustomSymbolImpl<DefaultSymbolOptions> {
	constructor() {
		super(defaultSymbolOptions as never)
	}
}
