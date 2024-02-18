// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type { CustomSchema, CustomSchema$, SCHEMA_NAME } from '~'

import type { LiteralOptions } from './LiteralOptions'

//

export interface CustomLiteral<O extends Partial<LiteralOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Literal'

	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: LiteralOptions.Default

	getValues: Set<this[OPTIONS]['Output']>
}

//

export interface CustomLiteral$<O extends Partial<LiteralOptions>>
	extends CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Literal'

	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: LiteralOptions.Default

	getValues: Set<this[OPTIONS]['Output']>
}
