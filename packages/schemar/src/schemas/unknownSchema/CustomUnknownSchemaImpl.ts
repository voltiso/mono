// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { DefaultUnknownSchemaOptions, UnknownSchemaOptions } from '~'
import {
	type Schemable,
	type SchemaOptions,
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	SCHEMA_NAME,
} from '~'

import { getSchema } from './getSchema'
import type { IUnknownSchema } from './IUnknownSchema'

export class CustomUnknownSchemaImpl<O extends SchemaOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements IUnknownSchema
{
	declare readonly [SCHEMA_NAME]: 'UnknownSchema';
	declare readonly [BASE_OPTIONS]: UnknownSchemaOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultUnknownSchemaOptions

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<S extends Schemable>(schemable: S) {
		return getSchema(schemable)
	}
}
