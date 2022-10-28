// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, GetShape_, Type_ } from '@voltiso/schemar.types'
import type { Observable } from 'rxjs'

import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'

export type NestedObservableWithSchema<S extends $$Schemable> = {
	get schemable(): S
} & Observable<Type_<S>> &
	Omit<
		{
			[k in keyof GetShape_<S>]: NestedObservableWithSchema<GetShape_<S>[k]>
		},
		NestedSubjectReservedField
	> & {
		_: {
			[k in keyof GetShape_<S>]: NestedObservableWithSchema<GetShape_<S>[k]>
		}
	}
