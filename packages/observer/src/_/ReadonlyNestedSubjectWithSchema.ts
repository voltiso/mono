// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'
import type { ReadonlySubjectWithSchema } from './ReadonlySubjectWithSchema'

export type ReadonlyNestedSubjectWithSchema<T> = ReadonlySubjectWithSchema<T> &
	Omit<
		{
			[k in keyof T]: ReadonlyNestedSubjectWithSchema<T[k]>
		},
		NestedSubjectReservedField
	> & {
		_: {
			[k in keyof T]: ReadonlyNestedSubjectWithSchema<T[k]>
		}
	}
