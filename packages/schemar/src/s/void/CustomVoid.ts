// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { VoidOptions } from './_/VoidOptions.js'
import type { IVoid } from './IVoid.js'

export interface CustomVoid<O extends VoidOptions>
	extends IVoid<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends IVoid> = CustomVoid<OptionalOptions<This>>
type Readonly<This extends IVoid> = CustomVoid<ReadonlyOptions<This>>
type Default<This extends IVoid> = CustomVoid<DefaultOptions<This>>
