// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type {
	ArrayOptions,
	CustomArray,
	IArray,
	IMutableArray,
	Input,
	Output,
	Schema,
	Schemable,
} from '~'
import * as s from '~'
import { isStringSchema } from '~'

describe('array', () => {
	it('generic', <O extends Partial<ArrayOptions>>() => {
		$Assert.is<CustomArray<O>, IArray>()
	})

	it('type', () => {
		$Assert.is<IArray, Schema>()

		$Assert.is<IArray, Schema>()

		const a = s.array(s.string.or(s.number))
		$Assert.is<typeof a, Schemable>()

		// $Assert.is<typeof a, Schema<(string | number)[]>>() // 5.2s

		const anl = s.array(s.number(123, 234))
		$Assert<IsIdentical<Output<typeof anl>, (123 | 234)[]>>()
		$Assert<IsIdentical<Input<typeof anl>, (123 | 234)[]>>()

		type A = typeof a.Output
		$Assert<IsIdentical<A, (string | number)[]>>()

		$Assert<IsIdentical<Output<typeof s.array>, unknown[]>>()
		$Assert<IsIdentical<Input<typeof s.array>, unknown[]>>()

		$Assert<IsIdentical<Output<typeof s.readonlyArray>, readonly unknown[]>>()
		$Assert<IsIdentical<Input<typeof s.readonlyArray>, readonly unknown[]>>()

		const an = s.array(s.number)
		$Assert<IsIdentical<Output<typeof an>, number[]>>()
		$Assert<IsIdentical<Input<typeof an>, number[]>>()

		const ro = s.readonlyArray(s.string)

		expect(isStringSchema(ro.getElementSchema)).toBeTruthy()

		type RoS = typeof ro.getElementSchema
		$Assert<IsIdentical<RoS, s.Schema<string>>>()

		type Ro = Output<typeof ro>
		$Assert<IsIdentical<Ro, readonly string[]>>()
		$Assert<IsIdentical<Input<typeof ro>, readonly string[]>>()

		const ro2 = s.array(s.string).readonlyArray
		type Ro2 = Output<typeof ro2>
		$Assert<IsIdentical<Ro2, readonly string[]>>()
		$Assert<IsIdentical<Input<typeof ro2>, readonly string[]>>()

		$Assert.is<typeof s.array, Schema>()
		$Assert.is<typeof s.readonlyArray, Schema>()

		$Assert.is<typeof s.array, IArray>()
		$Assert.is<typeof an, IArray>()
		$Assert.is<typeof anl, IArray>()
	})

	it('type 2', () => {
		const a = s.array(s.number)
		type A = typeof a.Output
		$Assert<IsIdentical<A, number[]>>()

		const b = s.array(s.never)
		type B = typeof b.Output
		$Assert<IsIdentical<B, never[]>>()
	})

	it('interface type', () => {
		expect.assertions(0)

		// type Out = IArray['Output']
		// $Assert<IsIdentical<Out, readonly unknown[]>>()

		// type In = IArray['Input']
		// $Assert<IsIdentical<In, readonly unknown[] | undefined>>()
	})

	it('interface type - mutable', () => {
		expect.assertions(0)

		type Out = IMutableArray['Output']
		$Assert<IsIdentical<Out, unknown[]>>()

		type In = IMutableArray['Input']
		$Assert<IsIdentical<In, unknown[]>>()
	})
})
