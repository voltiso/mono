// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '_'
import { SCHEMA_NAME } from '_'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	DefaultUnknownSchemaOptions,
	IUnknownSchema,
	Schemable,
	SchemaOptions,
	UnknownSchemaOptions,
} from '~'
import { CustomSchemaImpl } from '~'

import { getSchema } from './getSchema'

export interface CustomUnknownSchemaImpl<O> {
	readonly [BASE_OPTIONS]: UnknownSchemaOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownSchemaOptions
}

export class CustomUnknownSchemaImpl<O extends SchemaOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements IUnknownSchema
{
	readonly [SCHEMA_NAME] = 'UnknownSchema' as const

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
