// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { CustomSchema } from '~/Schema'

import type {
	DefaultUnknownSymbolOptions,
	UnknownSymbolOptions,
} from './UnknownSymbolOptions'

export interface CustomUnknownSymbol<O extends Partial<UnknownSymbolOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownSymbol'

	readonly [BASE_OPTIONS]: UnknownSymbolOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownSymbolOptions
}
