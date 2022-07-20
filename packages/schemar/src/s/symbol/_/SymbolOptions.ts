// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface SymbolOptions extends SchemaOptions {
	_out: symbol
	_in: symbol
}

export const defaultSymbolOptions = {
	...defaultSchemaOptions,
}

export type DefaultSymbolOptions = typeof defaultSymbolOptions & SymbolOptions
