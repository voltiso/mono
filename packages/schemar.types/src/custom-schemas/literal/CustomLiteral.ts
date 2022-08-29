// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'

import type { CustomSchema } from '~/Schema'

import type { DefaultLiteralOptions, LiteralOptions } from './LiteralOptions'

export type $CustomLiteral<O extends Partial<LiteralOptions>> = O extends any
	? CustomLiteral<O>
	: never

export interface CustomLiteral<O extends Partial<LiteralOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Literal'

	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultLiteralOptions

	getValues: Set<this[OPTIONS]['Output']>
}
