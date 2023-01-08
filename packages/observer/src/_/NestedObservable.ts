// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Observable } from 'rxjs'

export type NestedObservable<T> = Observable<T> & {
	[k in keyof T]: NestedObservable<T[k]>
}
