// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import type {
	$$Schemable,
	DefaultUnknownSchemaOptions,
	ISchemaInferrer,
	SchemaOptions,
	UnknownSchemaOptions,
} from '~'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'

import { infer } from './infer'

$assert(SCHEMA_NAME)

export interface CustomSchemaInferrerImpl<O> {
	readonly [BASE_OPTIONS]: UnknownSchemaOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownSchemaOptions
}

export class CustomSchemaInferrerImpl<O extends SchemaOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements ISchemaInferrer
{
	readonly [SCHEMA_NAME] = 'SchemaInferrer' as const

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
