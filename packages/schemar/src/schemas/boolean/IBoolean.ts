// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema, SCHEMA_NAME } from '~'

export interface IBoolean extends ISchema<boolean> {
	readonly [SCHEMA_NAME]: 'Boolean'

	// readonly [BASE_OPTIONS]: BooleanOptions
	// readonly [DEFAULT_OPTIONS]: DefaultBooleanOptions
}
