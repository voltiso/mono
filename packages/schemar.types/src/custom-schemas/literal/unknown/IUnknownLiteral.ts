// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { ISchema, SchemaLike } from '~/Schema'

import type {
	DefaultUnknownLiteralOptions,
	UnknownLiteralOptions,
} from './UnknownLiteralOptions'

export interface UnknownLiteralLike extends SchemaLike {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'
}

export interface IUnknownLiteral extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions
}
