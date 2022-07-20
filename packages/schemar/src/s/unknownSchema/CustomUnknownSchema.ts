// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { UnknownSchemaOptions } from './_/UnknownSchemaOptions.js'
import type { IUnknownSchema } from './IUnknownSchema.js'

export interface CustomUnknownSchema<O extends UnknownSchemaOptions>
	extends IUnknownSchema<O>,
		CustomSchema<O> {
	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

// simple

type Optional<This extends IUnknownSchema> = CustomUnknownSchema<
	OptionalOptions<This>
>

type Readonly<This extends IUnknownSchema> = CustomUnknownSchema<
	ReadonlyOptions<This>
>

type Default<This extends IUnknownSchema> = CustomUnknownSchema<
	DefaultOptions<This>
>

// conditional

// type Optional<This extends IUnknownSchema> =
// 	This[OPTIONS]['optional'] extends true
// 		? This
// 		: CustomUnknownSchema<OptionalOptions<This>>

// type Readonly<This extends IUnknownSchema> =
// 	This[OPTIONS]['readonly'] extends true
// 		? This
// 		: CustomUnknownSchema<ReadonlyOptions<This>>

//
