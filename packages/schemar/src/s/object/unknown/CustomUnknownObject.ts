import {
	OptionalOptions,
	ReadonlyOptions,
	DefaultOptions,
} from '../../../schema'
import { IUnknownObject } from './IUnknownObject'
import { UnknownObjectOptions } from './_/UnknownObjectOptions'

export interface CustomUnknownObject<O extends UnknownObjectOptions>
	extends IUnknownObject<O> {
	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type Optional<This extends IUnknownObject> = CustomUnknownObject<
	OptionalOptions<This>
>

type Readonly<This extends IUnknownObject> = CustomUnknownObject<
	ReadonlyOptions<This>
>

type Default<This extends IUnknownObject, D> = CustomUnknownObject<
	DefaultOptions<This, D>
>
