// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, GetShape_, Type_ } from '@voltiso/schemar'
import type { Observable } from 'rxjs'

import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'

export type NestedObservableWithSchema<S extends $$Schemable> = {
	get schemable(): S
} & Observable<Type_<S>> &
	Omit<
		{
			[k in keyof GetShape_<S>]: NestedObservableWithSchema<
				GetShape_<S>[k] & $$Schemable
			>
		},
		NestedSubjectReservedField
	> & {
		_: {
			[k in keyof GetShape_<S>]: NestedObservableWithSchema<
				GetShape_<S>[k] & $$Schemable
			>
		}
	}
