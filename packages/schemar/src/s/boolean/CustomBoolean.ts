// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { BooleanOptions } from './_/BooleanOptions.js'
import type { IBoolean } from './IBoolean.js'

export interface CustomBoolean<O extends BooleanOptions>
	extends IBoolean<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

//

type Optional<This extends IBoolean> = CustomBoolean<OptionalOptions<This>>
type Readonly<This extends IBoolean> = CustomBoolean<ReadonlyOptions<This>>
type Default<This extends IBoolean> = CustomBoolean<DefaultOptions<This>>
