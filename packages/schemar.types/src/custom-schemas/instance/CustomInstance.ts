// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type { CustomSchema, DefaultInstanceOptions, InstanceOptions } from '~'

export interface CustomInstance<O extends Partial<InstanceOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Instance'

	readonly [BASE_OPTIONS]: InstanceOptions
	readonly [DEFAULT_OPTIONS]: DefaultInstanceOptions

	//

	get getConstructor(): this[OPTIONS]['Constructor']
}
