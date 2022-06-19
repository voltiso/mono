import { Assert } from '@voltiso/ts-util/bdd'
import { CustomUnknownTuple } from './CustomUnknownTuple'
import { IUnknownTuple } from './IUnknownTuple'
import { UnknownTupleOptions } from './_/UnknownTupleOptions'
import * as s from '../..'
import { IsIdentical } from '@voltiso/ts-util'

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
