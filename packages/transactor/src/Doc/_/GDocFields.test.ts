// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '@voltiso/util'

import type { IDocTI } from '../DocTI.js'
import type { GDocFields } from './GDocFields.js'

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