// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../../schema'
import type { UnknownLiteralOptions } from './_/UnknownLiteralOptions.js'
import type { IUnknownLiteral } from './IUnknownLiteral.js'

export interface CustomUnknownLiteral<O extends UnknownLiteralOptions>
	extends IUnknownLiteral<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends IUnknownLiteral> = CustomUnknownLiteral<
	OptionalOptions<This>
>

type Readonly<This extends IUnknownLiteral> = CustomUnknownLiteral<
	ReadonlyOptions<This>
>

type Default<This extends IUnknownLiteral> = CustomUnknownLiteral<
	DefaultOptions<This>
>
