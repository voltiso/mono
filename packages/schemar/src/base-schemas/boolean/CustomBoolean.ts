// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { CustomSchema, CustomSchema$, SCHEMA_NAME } from '~'

import type { BooleanOptions } from './BooleanOptions'

export interface CustomBoolean<O extends Partial<BooleanOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Boolean'

	readonly [BASE_OPTIONS]: BooleanOptions
	readonly [DEFAULT_OPTIONS]: BooleanOptions.Default
}

//

export interface CustomBoolean$<O extends Partial<BooleanOptions>>
	extends CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Boolean'

	readonly [BASE_OPTIONS]: BooleanOptions
	readonly [DEFAULT_OPTIONS]: BooleanOptions.Default

	//

	get Final(): CustomBoolean<O>
}
