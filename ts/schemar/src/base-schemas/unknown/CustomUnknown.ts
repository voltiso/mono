// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$ } from '~'

import type { UnknownOptions } from './UnknownOptions'

//

export interface CustomUnknown<O extends Partial<UnknownOptions>>
	extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Unknown'

	readonly [Voltiso.BASE_OPTIONS]: UnknownOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownOptions.Default
}

//

export interface CustomUnknown$<O extends Partial<UnknownOptions>>
	extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Unknown'

	readonly [Voltiso.BASE_OPTIONS]: UnknownOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownOptions.Default

	//

	get Final(): CustomUnknown<O>
}
