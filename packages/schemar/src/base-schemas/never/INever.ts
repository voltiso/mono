// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { $$Schema, Schema, SCHEMA_NAME, Schema$ } from '~'

import type { NeverOptions } from './NeverOptions'

export interface $$Never extends $$Schema {
	readonly [SCHEMA_NAME]: 'Never'
}

export interface INever extends $$Never, Schema {
	readonly [SCHEMA_NAME]: 'Never'

	readonly [BASE_OPTIONS]: NeverOptions
	readonly [DEFAULT_OPTIONS]: NeverOptions.Default
}

export interface INever$ extends $$Never, Schema$ {
	readonly [SCHEMA_NAME]: 'Never'

	readonly [BASE_OPTIONS]: NeverOptions
	readonly [DEFAULT_OPTIONS]: NeverOptions.Default
}
