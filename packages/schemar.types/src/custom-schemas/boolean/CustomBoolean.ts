// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { CustomSchema } from '~/Schema'

import type { BooleanOptions, DefaultBooleanOptions } from './BooleanOptions'

export interface CustomBoolean<O extends Partial<BooleanOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Boolean'

	readonly [BASE_OPTIONS]: BooleanOptions
	readonly [DEFAULT_OPTIONS]: DefaultBooleanOptions
}

export type $CustomBoolean<O extends Partial<BooleanOptions>> = O extends any
	? CustomBoolean<O>
	: never
