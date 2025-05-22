// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema, Schema, Schema$ } from '~'

import type { LiteralOptions } from './LiteralOptions'

export interface $$Literal extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Literal'
}

export interface ILiteral extends $$Literal, Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Literal'

	readonly [Voltiso.BASE_OPTIONS]: LiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: LiteralOptions.Default

	get getValues(): Set<unknown>
}

export interface ILiteral$ extends $$Literal, Schema$ {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Literal'

	readonly [Voltiso.BASE_OPTIONS]: LiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: LiteralOptions.Default

	get getValues(): Set<unknown>

	//

	get Final(): ILiteral
}
