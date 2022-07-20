// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { InstanceOptions } from './_/InstanceOptions.js'
import type { IInstance } from './IInstance.js'

export interface CustomInstance<O extends InstanceOptions>
	extends IInstance<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends IInstance> = CustomInstance<OptionalOptions<This>>

type Readonly<This extends IInstance> = CustomInstance<ReadonlyOptions<This>>

type Default<This extends IInstance> = CustomInstance<DefaultOptions<This>>
