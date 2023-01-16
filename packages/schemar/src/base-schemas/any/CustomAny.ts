// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { AnyOptions, CustomSchema, CustomSchema$, SCHEMA_NAME } from '~'

//

export interface CustomAny<O extends Partial<AnyOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Any'

	readonly [BASE_OPTIONS]: AnyOptions
	readonly [DEFAULT_OPTIONS]: AnyOptions.Default
}

//

export interface CustomAny$<O extends Partial<AnyOptions>>
	extends CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Any'

	readonly [BASE_OPTIONS]: AnyOptions
	readonly [DEFAULT_OPTIONS]: AnyOptions.Default

	//

	get Final(): CustomAny<O>
}
