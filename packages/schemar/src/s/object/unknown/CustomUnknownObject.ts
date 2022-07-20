// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../../schema'
import type { UnknownObjectOptions } from './_/UnknownObjectOptions.js'
import type { IUnknownObject } from './IUnknownObject.js'

export interface CustomUnknownObject<O extends UnknownObjectOptions>
	extends IUnknownObject<O> {
	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Optional<This extends IUnknownObject> = CustomUnknownObject<
	OptionalOptions<This>
>

type Readonly<This extends IUnknownObject> = CustomUnknownObject<
	ReadonlyOptions<This>
>

type Default<This extends IUnknownObject> = CustomUnknownObject<
	DefaultOptions<This>
>
