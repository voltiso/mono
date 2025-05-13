// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { NeverOptions } from './NeverOptions'

//

export interface CustomNever<O extends Partial<NeverOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Never'

	readonly [BASE_OPTIONS]: NeverOptions
	readonly [DEFAULT_OPTIONS]: NeverOptions.Default
}

//

export interface CustomNever$<O extends Partial<NeverOptions>>
	extends CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Never'

	readonly [BASE_OPTIONS]: NeverOptions
	readonly [DEFAULT_OPTIONS]: NeverOptions.Default

	//

	get Final(): CustomNever<O>
}
