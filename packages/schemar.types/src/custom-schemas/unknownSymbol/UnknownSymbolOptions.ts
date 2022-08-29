// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~/SchemaOptions'

export interface UnknownSymbolOptions extends SchemaOptions {
	Output: symbol
	Input: symbol
}

export interface DefaultUnknownSymbolOptions extends DefaultSchemaOptions {
	Output: symbol
	Input: symbol
}
