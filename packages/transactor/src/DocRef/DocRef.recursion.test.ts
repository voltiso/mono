// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { Doc } from '~/Doc'
import { sStrongRef, sWeakRef } from '~/schemas'

import type { StrongDocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

declare module '..' {
	interface DocTypes {
		oops: Client
	}
}

class Client extends Doc({
	public: {
		strong: sStrongRef<'oops'>(),
		weak: sWeakRef<'oops'>(),
	},
}) {}

describe('DocRef', () => {
	it('recursion', () => {
		expect.assertions(0)

		//
		;() => {
			const client = 0 as unknown as Client

			$Assert<IsIdentical<typeof client.strong, StrongDocRef<'oops'>>>()
			$Assert<IsIdentical<typeof client.weak, WeakDocRef<'oops'>>>()
		}
	})
})
