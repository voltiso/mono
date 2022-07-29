// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RootSchemable, SchemaOptions } from '../../../Schema/index'
import { defaultSchemaOptions } from '../../../Schema/index'

export interface TupleOptions extends SchemaOptions {
	_out: readonly unknown[]
	_in: readonly unknown[]

	readonlyTuple: boolean
	elementSchemas: RootSchemable[]
}

export const defaultMutableTupleOptions = {
	...defaultSchemaOptions,
	readonlyTuple: false as const,
}

export const defaultReadonlyTupleOptions = {
	...defaultSchemaOptions,
	readonlyTuple: true as const,
}

export type DefaultMutableTupleOptions = typeof defaultMutableTupleOptions
export type DefaultReadonlyTupleOptions = typeof defaultReadonlyTupleOptions
