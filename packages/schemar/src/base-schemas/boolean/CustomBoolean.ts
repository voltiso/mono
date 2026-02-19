// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$ } from '~'

import type { BooleanOptions } from './BooleanOptions'

export interface CustomBoolean<
	O extends Partial<BooleanOptions>,
> extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Boolean'

	readonly [Voltiso.BASE_OPTIONS]: BooleanOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: BooleanOptions.Default
}

//

export interface CustomBoolean$<
	O extends Partial<BooleanOptions>,
> extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Boolean'

	readonly [Voltiso.BASE_OPTIONS]: BooleanOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: BooleanOptions.Default

	//

	get Final(): CustomBoolean<O>
}
