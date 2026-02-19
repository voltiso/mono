// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/class-methods-use-this */

import { SCHEMA_NAME } from '_'
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

export type __CustomSchemaInferrerImpl = InferSchema$NoReadonlyTuple_<[]>

$fastAssert(SCHEMA_NAME)

export interface CustomSchemaInferrerImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownSchemaOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownSchemaOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomSchemaInferrerImpl<O extends SchemaOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements ISchemaInferrer
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'SchemaInferrer' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable_(this) as never
	}

	[CALL]<S extends $$Schemable>(schemable: S): InferSchema$NoReadonlyTuple_<S> {
		return infer(schemable)
	}
}
