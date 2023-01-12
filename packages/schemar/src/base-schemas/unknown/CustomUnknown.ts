// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { CustomSchema, SCHEMA_NAME } from '~'

import type { UnknownOptions } from './UnknownOptions'

export interface CustomUnknown<O extends Partial<UnknownOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Unknown'

	readonly [BASE_OPTIONS]: UnknownOptions
	readonly [DEFAULT_OPTIONS]: UnknownOptions.Default
}
