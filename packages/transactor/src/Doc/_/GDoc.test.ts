// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'
import { Assert } from '@voltiso/util'

import type { IDocTI } from '~/Doc'

import type { GDoc } from './GDoc'

describe('Doc util', () => {
	it('GDoc basic', () => {
		expect.assertions(0)

		type X = ReturnType<GDoc<IDocTI, 'outside'>['dataWithId']>
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
			? ReturnType<GDoc<TI, 'outside'>['dataWithId']>
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
			GDoc<TI, 'outside'>['dataWithId'],
			() => { asd: number; __voltiso?: { numRefs: number } }
		>()
	})
})
