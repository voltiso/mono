// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { DefaultNeverOptions, ISchema, NeverOptions, SchemaLike } from '~'

export interface NeverLike extends SchemaLike<never> {
	readonly [SCHEMA_NAME]: 'Never'
}

export interface INever extends ISchema<never> {
	readonly [SCHEMA_NAME]: 'Never'

	readonly [BASE_OPTIONS]: NeverOptions
	readonly [DEFAULT_OPTIONS]: DefaultNeverOptions
}
