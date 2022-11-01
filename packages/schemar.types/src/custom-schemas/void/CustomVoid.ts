// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import type { SCHEMA_NAME } from '_'

import type { CustomSchema } from '~/Schema'

import type { DefaultVoidOptions, VoidOptions } from './VoidOptions'

export interface CustomVoid<O extends Partial<VoidOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Void'

	readonly [BASE_OPTIONS]: VoidOptions
	readonly [DEFAULT_OPTIONS]: DefaultVoidOptions
}
