// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { CustomSchema } from '~/Schema'

import type { DefaultUnknownOptions, UnknownOptions } from './UnknownOptions'

export interface CustomUnknown<O extends Partial<UnknownOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Unknown'

	readonly [BASE_OPTIONS]: UnknownOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownOptions
}
