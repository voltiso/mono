// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { DocTI, IDoc } from '~/Doc'
import type { IDocRef } from '~/DocRef'

import type { Relax } from './Relax'

describe('Relax', () => {
	it('type', () => {
		expect.assertions(0)

		type A = Relax<IDoc>
		$Assert.is<A, IDoc>()

		$Assert.is<Relax<IDoc>, IDoc>()

		$Assert.is<Relax<DocTI>, DocTI>()
		$Assert.is<Relax<IDocRef>, IDocRef>()
	})
})
