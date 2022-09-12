// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'
import type { ReadonlySubject } from './ReadonlySubject'

export type ReadonlyNestedSubject<T> = ReadonlySubject<T> &
	Omit<
		{
			[k in keyof T]: ReadonlyNestedSubject<T[k]>
		},
		NestedSubjectReservedField
	> & {
		_: {
			[k in keyof T]: ReadonlyNestedSubject<T[k]>
		}
	}
