// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface SymbolOptions extends SchemaOptions {
	Output: symbol
	Input: symbol
}

export const defaultSymbolOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as symbol,
	Input: 0 as unknown as symbol,
}

export type DefaultSymbolOptions = typeof defaultSymbolOptions
