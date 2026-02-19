// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $dev } from '@voltiso/util'
import type { Observer } from 'rxjs'

export interface IObserver extends Observer<unknown> {
	next(value: unknown): void
	// error(err: unknown): void
	// complete(): void
}

$dev(<T>() => {
	$Assert.is<Observer<T>, IObserver>()
})
