// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/class-methods-use-this */

// eslint-disable-next-line @voltiso/file-extension-in-import
import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import {
	$fastAssert,
	BoundCallable_,
	CALL,
	lazyConstructor,
} from '@voltiso/util'

import { infer } from '~/infer/infer'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { SchemaOptions } from '~/Schema/options/SchemaOptions'
import type { InferSchema$NoReadonlyTuple_ } from '~/types/InferSchema/InferSchemaNoReadonlyTuple'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { ISchemaInferrer } from './ISchemaInferrer'
import type { UnknownSchemaOptions } from './UnknownSchemaOptions'

// eslint-disable-next-line @typescript-eslint/naming-convention
export type __CustomSchemaInferrerImpl = InferSchema$NoReadonlyTuple_<[]>

$fastAssert(SCHEMA_NAME)

export interface CustomSchemaInferrerImpl<O> {
	readonly [BASE_OPTIONS]: UnknownSchemaOptions
	readonly [DEFAULT_OPTIONS]: UnknownSchemaOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomSchemaInferrerImpl<O extends SchemaOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements ISchemaInferrer
{
	readonly [SCHEMA_NAME] = 'SchemaInferrer' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable_(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<S extends $$Schemable>(schemable: S) {
		return infer(schemable)
	}
}
