import {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	ReadonlyOptions,
} from '../../schema'
import { IUnknown } from './IUnknown'
import { UnknownOptions } from './_/UnknownOptions'

export interface CustomUnknown<O extends UnknownOptions>
	extends IUnknown<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type Optional<This extends IUnknown> = CustomUnknown<OptionalOptions<This>>
type Readonly<This extends IUnknown> = CustomUnknown<ReadonlyOptions<This>>
type Default<This extends IUnknown, D> = CustomUnknown<DefaultOptions<This, D>>
