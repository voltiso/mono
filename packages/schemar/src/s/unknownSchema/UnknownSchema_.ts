import { CALL, callableInstance, lazyConstructor } from '@voltiso/ts-util/class'
import { Schemable, SchemaOptions, Schema_ } from '../../schema'
import { IS_UNKNOWN_SCHEMA, IUnknownSchema } from './IUnknownSchema'
import { getSchema } from './_/getSchema'
import {
	DefaultUnknownSchemaOptions,
	defaultUnknownSchemaOptions,
} from './_/UnknownSchemaOptions'

class UnknownSchema__<O extends SchemaOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements IUnknownSchema<O>
{
	readonly [IS_UNKNOWN_SCHEMA] = true as const

	constructor(o: O) {
		super(o)
		return callableInstance(this)
	}

	[CALL]<S extends Schemable>(schemable: S) {
		return getSchema(schemable)
	}
}

export class UnknownSchema_ extends UnknownSchema__<DefaultUnknownSchemaOptions> {
	constructor() {
		super(defaultUnknownSchemaOptions)
	}
}
