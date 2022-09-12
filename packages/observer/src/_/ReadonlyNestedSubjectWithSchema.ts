// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'

import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'
import type { ReadonlySubjectWithSchema } from './ReadonlySubjectWithSchema'

export type ReadonlyNestedSubjectWithSchema<S> = ReadonlySubjectWithSchema<S> &
	Omit<
		{
			[k in keyof S]: ReadonlyNestedSubjectWithSchema<S[k]>
		},
		NestedSubjectReservedField
	> & {
		readonly _: {
			[k in keyof S]: ReadonlyNestedSubjectWithSchema<S[k]>
		}
	}

export type ReadonlyNestedSubjectWithSchemaLike<S> = {
	get value(): Type_<S>

	get schemable(): S

	readonly _: any
}
