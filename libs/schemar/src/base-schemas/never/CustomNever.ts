// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$ } from '~'

import type { NeverOptions } from './NeverOptions'

//

export interface CustomNever<O extends Partial<NeverOptions>>
	extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Never'

	readonly [Voltiso.BASE_OPTIONS]: NeverOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NeverOptions.Default
}

//

export interface CustomNever$<O extends Partial<NeverOptions>>
	extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Never'

	readonly [Voltiso.BASE_OPTIONS]: NeverOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NeverOptions.Default

	//

	get Final(): CustomNever<O>
}
