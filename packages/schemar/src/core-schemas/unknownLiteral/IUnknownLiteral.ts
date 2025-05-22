// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema, Schema, Schema$ } from '~'

import type { UnknownLiteralOptions } from './UnknownLiteralOptions'

export interface $$UnknownLiteral extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownLiteral'
}

export interface IUnknownLiteral extends $$UnknownLiteral, Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownLiteral'

	readonly [Voltiso.BASE_OPTIONS]: UnknownLiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}

export interface IUnknownLiteral$ extends $$UnknownLiteral, Schema$ {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownLiteral'

	readonly [Voltiso.BASE_OPTIONS]: UnknownLiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}
