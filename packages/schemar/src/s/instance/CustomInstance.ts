import {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	ReadonlyOptions,
} from '../../schema'
import { IInstance } from './IInstance'
import { InstanceOptions } from './_/InstanceOptions'

export interface CustomInstance<O extends InstanceOptions>
	extends IInstance<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type Optional<This extends IInstance> = CustomInstance<OptionalOptions<This>>

type Readonly<This extends IInstance> = CustomInstance<ReadonlyOptions<This>>

type Default<This extends IInstance, D> = CustomInstance<
	DefaultOptions<This, D>
>
