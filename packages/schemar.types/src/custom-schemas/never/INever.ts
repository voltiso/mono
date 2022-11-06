// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { $$Schema, ISchema } from '~/Schema'

import type { DefaultNeverOptions, NeverOptions } from './NeverOptions'

export interface $$Never extends $$Schema {
	readonly [SCHEMA_NAME]: 'Never'
}

export interface INever extends $$Never, ISchema<never> {
	readonly [SCHEMA_NAME]: 'Never'

	readonly [BASE_OPTIONS]: NeverOptions
	readonly [DEFAULT_OPTIONS]: DefaultNeverOptions
}
