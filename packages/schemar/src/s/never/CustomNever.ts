// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { NeverOptions } from './_/NeverOptions.js'
import type { INever } from './INever.js'

export interface CustomNever<O extends NeverOptions>
	extends INever<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends INever> = CustomNever<OptionalOptions<This>>
type Readonly<This extends INever> = CustomNever<ReadonlyOptions<This>>
type Default<This extends INever> = CustomNever<DefaultOptions<This>>
