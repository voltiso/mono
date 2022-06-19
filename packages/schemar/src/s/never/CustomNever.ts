import {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	ReadonlyOptions,
} from '../../schema'
import { INever } from './INever'
import { NeverOptions } from './_/NeverOptions'

export interface CustomNever<O extends NeverOptions>
	extends INever<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type Optional<This extends INever> = CustomNever<OptionalOptions<This>>
type Readonly<This extends INever> = CustomNever<ReadonlyOptions<This>>
type Default<This extends INever, D> = CustomNever<DefaultOptions<This, D>>
