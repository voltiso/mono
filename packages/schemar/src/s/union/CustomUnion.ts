// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { UnionOptions } from './_/UnionOptions.js'
import type { IUnion } from './IUnion.js'

export interface CustomUnion<O extends UnionOptions>
	extends IUnion<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends IUnion> = CustomUnion<OptionalOptions<This>>
type Readonly<This extends IUnion> = CustomUnion<ReadonlyOptions<This>>
type Default<This extends IUnion> = CustomUnion<DefaultOptions<This>>
