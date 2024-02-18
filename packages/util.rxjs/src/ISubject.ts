// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $dev } from '@voltiso/util'
import type { Subject } from 'rxjs'

import type { IObserver } from './IObserver'

export interface ISubject extends Omit<Subject<unknown>, 'observers'> {
	observers: IObserver[]
}

$dev(<T>() => {
	$Assert.is<Subject<T>, ISubject>()
})
