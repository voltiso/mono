// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/patcher'
import type { IBehaviorSubject } from '@voltiso/util.rxjs'
import type { BehaviorSubject } from 'rxjs'

import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'

export interface INestedSubjectBase {
	set(x: unknown): void
	patch(x: unknown): void
	update(x: unknown): void
	delete(): void
	get exists(): boolean
}

export interface NestedSubjectBase<T> {
	set(x: T): void
	patch(x: PatchFor<T>): void
	update(x: PatchFor<T>): void
	delete(): void
	get exists(): boolean
}

//

export interface INestedSubject extends INestedSubjectBase, IBehaviorSubject {
	_: {}
}

export type NestedSubject<T> = NestedSubjectBase<T> &
	BehaviorSubject<T> &
	Omit<
		{
			[k in keyof T]-?: NestedSubject<Exclude<T[k], undefined>>
		},
		NestedSubjectReservedField
	> & {
		_: {
			[k in keyof T]-?: NestedSubject<Exclude<T[k], undefined>>
		}
	}
