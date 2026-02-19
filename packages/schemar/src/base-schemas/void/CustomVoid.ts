// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$ } from '~'
import type { VoidOptions } from '~/base-schemas/void/options/VoidOptions'

//

export interface CustomVoid<
	O extends Partial<VoidOptions>,
> extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Void'

	readonly [Voltiso.BASE_OPTIONS]: VoidOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: VoidOptions.Default
}

//

export interface CustomVoid$<
	O extends Partial<VoidOptions>,
> extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Void'

	readonly [Voltiso.BASE_OPTIONS]: VoidOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: VoidOptions.Default

	//

	get Final(): CustomVoid<O>
}
