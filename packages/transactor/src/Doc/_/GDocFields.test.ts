// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '@voltiso/util'

import type { DocTI } from '~/Doc'

import type { GDocFields } from './GDocFields'

describe('GDocFields', () => {
	it('works', () => {
		expect.assertions(0)

		type X = GDocFields<DocTI>
		Assert(
			Is<X>().identicalTo<{
				__voltiso?: PromiseLike<
					| {
							aggregateTarget: {}
							numRefs: number
							aggregateSource: Record<string, true>
					  }
					| undefined
				>
			}>(),
		)
	})
})
