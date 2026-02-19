// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$ } from '~'

import type { LiteralOptions } from './LiteralOptions'

//

export interface CustomLiteral<
	O extends Partial<LiteralOptions>,
> extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Literal'

	readonly [Voltiso.BASE_OPTIONS]: LiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: LiteralOptions.Default

	getValues: Set<this[Voltiso.OPTIONS]['Output']>
}

//

export interface CustomLiteral$<
	O extends Partial<LiteralOptions>,
> extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Literal'

	readonly [Voltiso.BASE_OPTIONS]: LiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: LiteralOptions.Default

	getValues: Set<this[Voltiso.OPTIONS]['Output']>
}
