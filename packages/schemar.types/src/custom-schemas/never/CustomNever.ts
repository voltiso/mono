// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { CustomSchema } from '~/Schema'

import type { DefaultNeverOptions, NeverOptions } from './NeverOptions'

export interface CustomNever<O extends Partial<NeverOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Never'

	readonly [BASE_OPTIONS]: NeverOptions
	readonly [DEFAULT_OPTIONS]: DefaultNeverOptions
}

export type $CustomNever<O extends Partial<NeverOptions>> = O extends any
	? CustomNever<O>
	: never
