// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { ILiteral } from '..'
import type { LiteralOptions } from './_/LiteralOptions.js'

export interface CustomLiteral<O extends LiteralOptions>
	extends ILiteral<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends ILiteral> = CustomLiteral<OptionalOptions<This>>
type Readonly<This extends ILiteral> = CustomLiteral<ReadonlyOptions<This>>
type Default<This extends ILiteral> = CustomLiteral<DefaultOptions<This>>
