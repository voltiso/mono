// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/patcher'
import type { BehaviorSubject } from 'rxjs'

export type NestedSubject<T> = {
	set(x: T): void
	patch(x: PatchFor<T>): void
	update(x: PatchFor<T>): void
} & BehaviorSubject<T> & {
		[k in keyof T]: NestedSubject<T[k]>
	}
