// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type {
	CustomUnknownTuple,
	IUnknownTuple,
	readonlyTuple,
	tuple,
	UnknownTupleOptions,
} from '~'

describe('array', () => {
	it('generic', <O extends UnknownTupleOptions>() => {
		expect.assertions(0)

		Assert.is<CustomUnknownTuple<O>, IUnknownTuple>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = typeof tuple.OutputType
		Assert<IsIdentical<A, unknown[]>>()

		type B = typeof readonlyTuple.OutputType
		Assert<IsIdentical<B, readonly unknown[]>>()
	})
})
