// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '@voltiso/util'

import type { IDocTI } from '../DocTI'
import type { GDocFields } from './GDocFields'

describe('GDocFields', () => {
	it('works', () => {
		expect.assertions(0)

		type X = GDocFields<IDocTI>
		Assert(
			Is<X>().identicalTo<{
				__voltiso?: PromiseLike<{ numRefs: number } | undefined>
			}>(),
		)
	})
})
