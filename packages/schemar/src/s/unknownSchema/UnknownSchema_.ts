// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { Schemable, SchemaOptions } from '../../schema'
import { Schema_ } from '../../schema'
import { getSchema } from './_/getSchema'
import type { DefaultUnknownSchemaOptions } from './_/UnknownSchemaOptions.js'
import { defaultUnknownSchemaOptions } from './_/UnknownSchemaOptions.js'
import type { IUnknownSchema } from './IUnknownSchema.js'
import { IS_UNKNOWN_SCHEMA } from './IUnknownSchema.js'

class UnknownSchema__<O extends SchemaOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements IUnknownSchema<O>
{
	readonly [IS_UNKNOWN_SCHEMA] = true as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this)
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<S extends Schemable>(schemable: S) {
		return getSchema(schemable)
	}
}

export class UnknownSchema_ extends UnknownSchema__<DefaultUnknownSchemaOptions> {
	constructor() {
		super(defaultUnknownSchemaOptions)
	}
}
