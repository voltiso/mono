// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable_, SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface TupleOptions extends SchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	isReadonlyTuple: boolean
	elementSchemas: Schemable_[]
}

//

export const defaultTupleOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as readonly unknown[],
	Input: 0 as unknown as readonly unknown[],

	isReadonlyTuple: false as const,
	elementSchemas: 0 as unknown as Schemable_[],
}
export type DefaultTupleOptions = typeof defaultTupleOptions

//

export const defaultMutableTupleOptions = {
	...defaultTupleOptions,
	isReadonlyTuple: false as const,
}

export type DefaultMutableTupleOptions = typeof defaultMutableTupleOptions

//

export const defaultReadonlyTupleOptions = {
	...defaultTupleOptions,
	isReadonlyTuple: true as const,
}

export type DefaultReadonlyTupleOptions = typeof defaultReadonlyTupleOptions
