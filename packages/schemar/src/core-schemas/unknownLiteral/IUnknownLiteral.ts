// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { $$Schema, Schema, SCHEMA_NAME, Schema$ } from '~'

import type { UnknownLiteralOptions } from './UnknownLiteralOptions'

export interface $$UnknownLiteral extends $$Schema {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'
}

export interface IUnknownLiteral extends $$UnknownLiteral, Schema {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}

export interface IUnknownLiteral$ extends $$UnknownLiteral, Schema$ {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}
