// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/util'
import type { IBehaviorSubject } from '@voltiso/util.rxjs'
import type { Subject } from 'rxjs'

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

export type _NestedSubjectRec<T, Additional> = Omit<
	{
		[k in keyof T]-?: NestedSubject<T[k] | Additional>
	},
	NestedSubjectReservedField
> & {
	value: T
	_: {
		[k in keyof T]-?: NestedSubject<T[k] | Additional>
	}
}

export type NestedSubject<T> = NestedSubjectBase<T> &
	Subject<T> &
	_NestedSubjectRec<Exclude<T, undefined>, Extract<T, undefined>>
