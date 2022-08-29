// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferSchema_ } from '~/InferSchema'
import type { Simplify } from '~/Schema'
import type { SchemableLike } from '~/Schemable'

import type { CustomUnknownSchema } from './CustomUnknownSchema'

export interface InferAndSimplifyFunction {
	<S extends SchemableLike>(schemable: S): Simplify<InferSchema_<S>>
}

export type UnknownSchemaConstructor = new () => UnknownSchema

export interface UnknownSchema
	extends CustomUnknownSchema<{}>,
		InferAndSimplifyFunction {}
