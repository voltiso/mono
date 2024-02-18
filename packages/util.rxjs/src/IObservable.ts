// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $dev } from '@voltiso/util'
import type { Observable } from 'rxjs'

export interface IObservable extends Observable<unknown> {
	//
}

$dev(<T>() => {
	$Assert.is<Observable<T>, IObservable>()
})
