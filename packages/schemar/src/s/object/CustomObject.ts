// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeepPartial } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultOptions,
	MergeOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { DeepPartialShape } from './_/deepPartialShape.js'
import type { ObjectOptions } from './_/ObjectOptions.js'
import type { PartialShape } from './_/partialShape.js'
import type { IObject } from './IObject.js'

export interface CustomObject<O extends ObjectOptions>
	extends IObject<O>,
		CustomSchema<O> {
	get partial(): MakePartial<this>
	get deepPartial(): MakeDeepPartial<this>

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
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
type Default<This extends IObject> = CustomObject<DefaultOptions<This>>
