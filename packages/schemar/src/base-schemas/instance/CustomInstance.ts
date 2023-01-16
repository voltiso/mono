// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type {
	CustomSchema,
	CustomSchema$,
	InstanceOptions,
	SCHEMA_NAME,
} from '~'

export interface CustomInstance<O extends Partial<InstanceOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Instance'

	readonly [BASE_OPTIONS]: InstanceOptions
	readonly [DEFAULT_OPTIONS]: InstanceOptions.Default

	//

	get getConstructor(): this[OPTIONS]['Constructor']
}

export interface CustomInstance$<O extends Partial<InstanceOptions>>
	extends CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Instance'

	readonly [BASE_OPTIONS]: InstanceOptions
	readonly [DEFAULT_OPTIONS]: InstanceOptions.Default

	//

	get getConstructor(): this[OPTIONS]['Constructor']
}
