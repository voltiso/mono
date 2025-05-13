// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { RequiredSubjectTree } from '@voltiso/util.rxjs'
import type { BehaviorSubject } from 'rxjs'

import { useObservable } from './useObservable'

describe('useObservable', () => {
	it('type', () => {
		expect.assertions(0)

		const a$ = {} as unknown as
			| RequiredSubjectTree<true>
			| RequiredSubjectTree<false>
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const a = () => useObservable(a$)
		$Assert<IsIdentical<ReturnType<typeof a>, boolean>>()

		const b$ = {} as unknown as RequiredSubjectTree<boolean>
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const b = () => useObservable(b$)
		$Assert<IsIdentical<ReturnType<typeof b>, boolean>>()

		const c$ = {} as unknown as BehaviorSubject<true> | BehaviorSubject<false>
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const c = () => useObservable(c$)
		$Assert<IsIdentical<ReturnType<typeof c>, boolean>>()
	})
})
