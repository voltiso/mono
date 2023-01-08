// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'
import type { Override } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Doc, DocTI } from '~/Doc'

describe('Doc util', () => {
	it('GDoc basic', () => {
		expect.assertions(0)

		type X = ReturnType<Doc<DocTI>['dataWithId']>
		$Assert.isSubtype<
			X,
			{ readonly id: string; __voltiso?: { numRefs: number } }
		>()
	})

	it('GDoc - generic', <TI extends DocTI>() => {
		expect.assertions(0)

		// const docO = 0 as unknown as GO<TI>
		// const x = docO.dataWithId()
		type X = TI extends any ? ReturnType<Doc<TI>['dataWithId']> : never

		$Assert.isSubtype<
			X,
			{ readonly id: string; __voltiso?: { numRefs: number } }
		>()
		// Assert<{ readonly id: string; __voltiso?: { numRefs: number } }, X>()
	})

	it('GDoc custom', () => {
		expect.assertions(0)

		type TI = Override<DocTI, { public: s.Object<{ asd: s.Number }> }>
		$Assert.isSubtype<
			Doc<TI>['dataWithId'],
			() => { asd: number; __voltiso?: { numRefs: number } }
		>()
	})
})
