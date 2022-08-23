// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	CustomUnknownSchema,
	InferSchema_,
	SchemableLike,
	Simplify,
} from '~'
import { UnknownSchemaImpl } from '~'

export interface InferAndSimplifyFunction {
	<S extends SchemableLike>(schemable: S): Simplify<InferSchema_<S>>

	// <S extends SchemableLike>(schemable: S): SchemaLike extends S
	// 	? Schema
	// 	: InferableLike extends S
	// 	? Schema
	// 	: Inferable extends S
	// 	? Schema
	// 	: ISchema extends S
	// 	? Schema
	// 	: InferSchema<S>['simple']
}

export interface UnknownSchema
	extends CustomUnknownSchema<{}>,
		InferAndSimplifyFunction {}

export const UnknownSchema = lazyConstructor(
	() => UnknownSchemaImpl,
) as unknown as UnknownConstructor

export type UnknownConstructor = new () => UnknownSchema

export const schema = lazyValue(() => new UnknownSchema())
