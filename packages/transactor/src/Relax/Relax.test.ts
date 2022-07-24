// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { IDoc, IDocTI } from '../Doc'
import type { IRef } from '../Ref'
import type { Relax } from './Relax.js'

describe('Relax', () => {
	it('type', () => {
		expect.assertions(0)

		Assert.is<Relax<IDoc>, IDoc>()

		Assert.is<Relax<IDoc>, IDoc>()

		Assert.is<Relax<IDocTI>, IDocTI>()
		Assert.is<Relax<IRef>, IRef>()
	})
})
