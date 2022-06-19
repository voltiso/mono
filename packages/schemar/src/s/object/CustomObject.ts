import { DeepPartial } from '@voltiso/ts-util/object'
import {
	CustomSchema,
	DefaultOptions,
	MergeOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import { IObject } from './IObject'
import { DeepPartialShape } from './_/deepPartialShape'
import { ObjectOptions } from './_/ObjectOptions'
import { PartialShape } from './_/partialShape'

export interface CustomObject<O extends ObjectOptions>
	extends IObject<O>,
		CustomSchema<O> {
	get partial(): MakePartial<this>
	get deepPartial(): MakeDeepPartial<this>

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type MakePartial<This extends IObject> = IObject<
	MergeOptions<
		This,
		{
			shape: PartialShape<This[OPTIONS]['shape']>
			_out: Partial<This['OutputType']>
			_in: Partial<This['InputType']>
		}
	>
>

type MakeDeepPartial<This extends IObject> = IObject<
	MergeOptions<
		This,
		{
			shape: DeepPartialShape<This[OPTIONS]['shape']>
			_out: DeepPartial<This['OutputType']>
			_in: DeepPartial<This['InputType']>
		}
	>
>

//

type Optional<This extends IObject> = CustomObject<OptionalOptions<This>>
type Readonly<This extends IObject> = CustomObject<ReadonlyOptions<This>>
type Default<This extends IObject, D> = CustomObject<DefaultOptions<This, D>>
