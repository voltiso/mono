// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/patcher'
import type { BehaviorSubject } from 'rxjs'

import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'

export type NestedSubjectBase<T> = {
	set(x: T): void
	patch(x: PatchFor<T>): void
	update(x: PatchFor<T>): void
}

export type NestedSubject<T> = NestedSubjectBase<T> &
	BehaviorSubject<T> &
	Omit<
		{
			[k in keyof T]: NestedSubject<T[k]>
		},
		NestedSubjectReservedField
	> & {
		_: {
			[k in keyof T]: NestedSubject<T[k]>
		}
	}
