// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schemable,
	DefaultUnknownSchemaOptions,
	IUnknownSchema,
	SchemaOptions,
	UnknownSchemaOptions,
} from '@voltiso/schemar.types'
import { SCHEMA_NAME } from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS} from '@voltiso/util';
import { BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'

import { infer } from './infer'

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
		return BoundCallable(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<S extends $$Schemable>(schemable: S) {
		return infer(schemable)
	}
}
