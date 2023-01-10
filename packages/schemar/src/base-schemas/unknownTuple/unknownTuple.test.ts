// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	CustomUnknownTuple,
	IUnknownTuple,
	MutableUnknownTuple,
	UnknownTupleOptions,
} from '~'

import type { ReadonlyUnknownTuple } from '.'

describe('array', () => {
	it('generic', <O extends UnknownTupleOptions>() => {
		expect.assertions(0)

		$Assert.is<CustomUnknownTuple<O>, IUnknownTuple>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = MutableUnknownTuple['Output']
		$Assert<IsIdentical<A, unknown[]>>()

		type B = ReadonlyUnknownTuple['Output']
		$Assert<IsIdentical<B, readonly unknown[]>>()
	})
})
