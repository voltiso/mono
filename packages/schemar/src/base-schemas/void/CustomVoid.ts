// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { CustomSchema } from '~'
import type { VoidOptions } from '~/base-schemas/void/options/VoidOptions'

export interface CustomVoid<O extends Partial<VoidOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Void'

	readonly [BASE_OPTIONS]: VoidOptions
	readonly [DEFAULT_OPTIONS]: VoidOptions.Default
}
