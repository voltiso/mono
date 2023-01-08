// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	$$Schemable,
	CustomSchemaInferrer,
	InferSchema_,
	SimplifySchema,
} from '~'

import { SchemaInferrerImpl } from './SchemaInferrerImpl'

export interface InferAndSimplifyFunction {
	<S extends $$Schemable>(schemable: S): S extends any
		? SimplifySchema<InferSchema_<S>>
		: never
}

export type SchemaInferrerConstructor = new () => SchemaInferrer

export interface SchemaInferrer
	extends CustomSchemaInferrer<{}>,
		InferAndSimplifyFunction {}

//

export const SchemaInferrer = lazyConstructor(
	() => SchemaInferrerImpl,
) as unknown as SchemaInferrerConstructor

export const schema = lazyValue(() => new SchemaInferrer())
