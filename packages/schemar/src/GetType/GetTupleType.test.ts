/* eslint-disable @typescript-eslint/ban-types */
import { IsIdentical } from '@voltiso/ts-util'
import { Assert } from '@voltiso/ts-util/bdd'
import { IRootSchema, InferableLiteral, RootSchemable } from '../schema'
import { GetTupleType } from './GetTupleType'
import * as s from '../s'

describe('GetTupleType', () => {
	it('literal', () => {
		expect.assertions(0)

		type A = GetTupleType<1[], { kind: 'out' }>
		Assert<IsIdentical<A, 1[]>>()

		type B = GetTupleType<number[], { kind: 'out' }>
		Assert<IsIdentical<B, number[]>>()

		type C = GetTupleType<(number | string)[], { kind: 'out' }>
		Assert<IsIdentical<C, (number | string)[]>>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = GetTupleType<[s.Number, s.String], { kind: 'out' }>
		Assert<IsIdentical<A, [number, string]>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type A = GetTupleType<InferableLiteral[], { kind: 'out' }>
		Assert<IsIdentical<A, InferableLiteral[]>>()

		type B = GetTupleType<IRootSchema[], { kind: 'out' }>
		Assert<IsIdentical<B, unknown[]>>()

		type C = GetTupleType<RootSchemable[], { kind: 'out' }>
		Assert<IsIdentical<C, unknown[]>>()

		type D = GetTupleType<readonly RootSchemable[], { kind: 'out' }>
		Assert<IsIdentical<D, readonly unknown[]>>()
	})
})
