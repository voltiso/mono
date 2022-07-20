// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { UnknownOptions } from './_/UnknownOptions.js'
import type { IUnknown } from './IUnknown.js'

export interface CustomUnknown<O extends UnknownOptions>
	extends IUnknown<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends IUnknown> = CustomUnknown<OptionalOptions<This>>
type Readonly<This extends IUnknown> = CustomUnknown<ReadonlyOptions<This>>
type Default<This extends IUnknown> = CustomUnknown<DefaultOptions<This>>
