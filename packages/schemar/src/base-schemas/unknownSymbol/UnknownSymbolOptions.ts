// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

export interface UnknownSymbolOptions extends SchemaOptions {
	Output: symbol
	Input: symbol
}

export interface DefaultUnknownSymbolOptions extends SchemaOptions.Default {
	Output: symbol
	Input: symbol
}
