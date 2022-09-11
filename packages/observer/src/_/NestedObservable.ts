// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Observable } from 'rxjs'

import type { NestedSubjectReservedField } from '~'

export type NestedObservable<T> = Observable<T> & {
	[k in keyof T]: NestedObservable<T[k]>
}

export type ReadonlySubject<T> = Observable<T> & { value: T }

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
