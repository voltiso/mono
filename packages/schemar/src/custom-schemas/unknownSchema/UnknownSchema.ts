// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	CustomUnknownSchema,
	Inferable,
	InferableLike,
	InferSchema,
	ISchema,
	ISchemaLike,
	SchemableLike,
} from '~'
import { UnknownSchemaImpl } from '~'

export interface InferAndSimplifyFunction {
	<S extends SchemableLike>(schemable: S): ISchemaLike extends S
		? ISchema
		: InferableLike extends S
		? ISchema
		: Inferable extends S
		? ISchema
		: ISchema extends S
		? ISchema
		: InferSchema<S>['simple']
}

export interface UnknownSchema
	extends CustomUnknownSchema<{}>,
		InferAndSimplifyFunction {}

export const UnknownSchema = lazyConstructor(
	() => UnknownSchemaImpl,
) as unknown as UnknownConstructor

export type UnknownConstructor = new () => UnknownSchema

export const schema = lazyValue(() => new UnknownSchema())
