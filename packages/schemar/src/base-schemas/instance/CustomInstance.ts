// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$, InstanceOptions } from '~'

export interface CustomInstance<O extends Partial<InstanceOptions>>
	extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Instance'

	readonly [Voltiso.BASE_OPTIONS]: InstanceOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: InstanceOptions.Default

	//

	get getConstructor(): this[Voltiso.OPTIONS]['Constructor']
}

export interface CustomInstance$<O extends Partial<InstanceOptions>>
	extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Instance'

	readonly [Voltiso.BASE_OPTIONS]: InstanceOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: InstanceOptions.Default

	//

	get getConstructor(): this[Voltiso.OPTIONS]['Constructor']
}
