// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	$fastAssert,
	BoundCallable_,
	CALL,
	lazyConstructor,
} from '@voltiso/util'
import { SCHEMA_NAME } from '_'

import { infer } from '~/infer/infer'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { SchemaOptions } from '~/Schema/options/SchemaOptions'
import type { InferSchema$NoReadonlyTuple_ } from '~/types/InferSchema/InferSchemaNoReadonlyTuple'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { ISchemaInferrer } from './ISchemaInferrer'
import type { UnknownSchemaOptions } from './UnknownSchemaOptions'

export type __CustomSchemaInferrerImpl = InferSchema$NoReadonlyTuple_<[]>

$fastAssert(SCHEMA_NAME)

// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomSchemaInferrerImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownSchemaOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownSchemaOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomSchemaInferrerImpl<O extends SchemaOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements ISchemaInferrer
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'SchemaInferrer' as const

	constructor(o: O) {
		super(o)

		// biome-ignore lint/correctness/noConstructorReturn: .
		return BoundCallable_(this) as never
	}

	[CALL]<S extends $$Schemable>(schemable: S): InferSchema$NoReadonlyTuple_<S> {
		return infer(schemable)
	}
}
