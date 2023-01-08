// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubject } from '@voltiso/observer'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { BehaviorSubject } from 'rxjs'

import { useObservable } from '.'

describe('useObservable', () => {
	it('type', () => {
		expect.assertions(0)

		const a$ = {} as unknown as NestedSubject<true> | NestedSubject<false>
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const a = () => useObservable(a$)
		$Assert<IsIdentical<ReturnType<typeof a>, boolean>>()

		const b$ = {} as unknown as NestedSubject<boolean>
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const b = () => useObservable(b$)
		$Assert<IsIdentical<ReturnType<typeof b>, boolean>>()

		const c$ = {} as unknown as BehaviorSubject<true> | BehaviorSubject<false>
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const c = () => useObservable(c$)
		$Assert<IsIdentical<ReturnType<typeof c>, boolean>>()
	})
})
