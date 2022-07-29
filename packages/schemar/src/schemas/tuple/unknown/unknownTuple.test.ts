// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type * as s from '../../index'
import type { UnknownTupleOptions } from './_/UnknownTupleOptions.js'
import type { CustomUnknownTuple } from './CustomUnknownTuple.js'
import type { IUnknownTuple } from './IUnknownTuple.js'

describe('array', () => {
	it('generic', <O extends UnknownTupleOptions>() => {
		expect.assertions(0)

		Assert.is<IUnknownTuple<O>, IUnknownTuple>()
		Assert.is<CustomUnknownTuple<O>, IUnknownTuple<O>>()
		Assert.is<CustomUnknownTuple<O>, IUnknownTuple>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = typeof s.tuple.OutputType
		Assert<IsIdentical<A, unknown[]>>()

		type B = typeof s.readonlyTuple.OutputType
		Assert<IsIdentical<B, readonly unknown[]>>()
	})
})
