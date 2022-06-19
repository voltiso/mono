import {
	CustomSchema,
	OptionalOptions,
	ReadonlyOptions,
	DefaultOptions,
} from '../../schema'
import { IUnion } from './IUnion'
import { UnionOptions } from './_/UnionOptions'

export interface CustomUnion<O extends UnionOptions>
	extends IUnion<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type Optional<This extends IUnion> = CustomUnion<OptionalOptions<This>>
type Readonly<This extends IUnion> = CustomUnion<ReadonlyOptions<This>>
type Default<This extends IUnion, D> = CustomUnion<DefaultOptions<This, D>>
