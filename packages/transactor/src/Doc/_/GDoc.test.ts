// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'
import { Assert } from '@voltiso/util'

import type { Doc, IDocTI } from '~/Doc'

describe('Doc util', () => {
	it('GDoc basic', () => {
		expect.assertions(0)

		type X = ReturnType<Doc<IDocTI, 'outside'>['dataWithId']>
		Assert.isSubtype<
			X,
			{ readonly id: string; __voltiso?: { numRefs: number } }
		>()
	})

	it('GDoc - generic', <TI extends IDocTI>() => {
		expect.assertions(0)

		// const docO = 0 as unknown as GO<TI>
		// const x = docO.dataWithId()
		type X = TI extends any
			? ReturnType<Doc<TI, 'outside'>['dataWithId']>
			: never

		Assert.isSubtype<
			X,
			{ readonly id: string; __voltiso?: { numRefs: number } }
		>()
		// Assert<{ readonly id: string; __voltiso?: { numRefs: number } }, X>()
	})

	it('GDoc custom', () => {
		expect.assertions(0)

		type TI = IDocTI & { public: { asd: s.Number } }
		Assert.isSubtype<
			Doc<TI, 'outside'>['dataWithId'],
			() => { asd: number; __voltiso?: { numRefs: number } }
		>()
	})
})
