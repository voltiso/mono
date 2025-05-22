// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AnyOptions, CustomSchema, CustomSchema$ } from '~'

//

export interface CustomAny<O extends Partial<AnyOptions>>
	extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Any'

	readonly [Voltiso.BASE_OPTIONS]: AnyOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: AnyOptions.Default
}

//

export interface CustomAny$<O extends Partial<AnyOptions>>
	extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Any'

	readonly [Voltiso.BASE_OPTIONS]: AnyOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: AnyOptions.Default

	//

	get Final(): CustomAny<O>
}
