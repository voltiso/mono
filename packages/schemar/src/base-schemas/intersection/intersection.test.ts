// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	CustomIntersection,
	IIntersection,
	Input,
	IntersectionOptions,
	Output,
} from '~'
import * as s from '~'

describe('intersection', () => {
	it('generic', <O extends Partial<IntersectionOptions>>() => {
		type X = O extends any ? CustomIntersection<O> : never
		$Assert.is<X, IIntersection>()
		$Assert.is<CustomIntersection<O>, IIntersection>()
	})

	it('works', () => {
		expect.hasAssertions()

		const sn = s.and(s.string, s.number.or(s.string))
		type Sn = Output<typeof sn>
		$Assert<IsIdentical<Sn, string>>()
		$Assert<IsIdentical<Input<typeof sn>, string>>()

		const sn2 = s.string.and(s.number)
		type Sn2 = Output<typeof sn2>
		$Assert<IsIdentical<Sn2, never>>()
		$Assert<IsIdentical<Input<typeof sn2>, never>>()

		expect(s.number.and(123).isValid(123)).toBeTruthy()
		expect(s.number.and(123).isValid(2)).toBeFalsy()
		expect(s.number.and(undefined).isValid(123)).toBeFalsy()
	})
})
