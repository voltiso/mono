import { defaultSchemaOptions } from '~/Schema'

import type * as t from '@voltiso/schemar.types'

export const defaultTupleOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as readonly unknown[],
	Input: 0 as unknown as readonly unknown[],

	isReadonlyTuple: false as const,
	shape: 0 as unknown as t.SchemableLike[],
}

export const defaultMutableTupleOptions = {
	...defaultTupleOptions,
	isReadonlyTuple: false as const,
}

export const defaultReadonlyTupleOptions = {
	...defaultTupleOptions,
	isReadonlyTuple: true as const,
}
