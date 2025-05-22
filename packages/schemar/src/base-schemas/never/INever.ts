// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema, Schema, Schema$ } from '~'

import type { NeverOptions } from './NeverOptions'

export interface $$Never extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Never'
}

export interface INever extends $$Never, Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Never'

	readonly [Voltiso.BASE_OPTIONS]: NeverOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NeverOptions.Default
}

export interface INever$ extends $$Never, Schema$ {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Never'

	readonly [Voltiso.BASE_OPTIONS]: NeverOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NeverOptions.Default
}
