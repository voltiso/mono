// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { InputType, ISchema, NeverOptions, OutputType } from '~'
import * as s from '~'

describe('never', () => {
	it('generic', <_O extends Partial<NeverOptions>>() => {
		expect.assertions(0)

		// Assert.is<CustomNever<O>, INever>() // ! too deep...
	})

	it('simple', () => {
		expect.hasAssertions()

		Assert.is<typeof s.never, ISchema>()

		type A1 = OutputType<typeof s.never>
		type A2 = InputType<typeof s.never>
		Assert<IsIdentical<A1, never>>()
		Assert<IsIdentical<A2, never>>()

		type B = s.Never['OutputType']
		Assert.is<B, never>()

		type C = s.Never['OutputType']['optional']
		Assert.is<C, never>()

		type D = s.Never['OutputType']['optional']['optional']
		Assert.is<D, never>()

		type E = s.Never['OutputType']['optional']['readonly']
		Assert.is<E, never>()

		const e = s.never.optional.readonly

		expect(e.isReadonly).toBeTruthy()
		expect(e.isOptional).toBeTruthy()

		Assert.is<typeof e['isOptional'], true>()
		Assert.is<typeof e['isReadonly'], true>()

		expect(s.never.extends(s.never)).toBeTruthy()
		expect(s.never.extends(s.number)).toBeTruthy()
		expect(s.never.extends(s.unknown)).toBeTruthy()

		expect(s.never.extends(s.undefined)).toBeTruthy()
		expect(s.number.extends(s.never)).toBeFalsy()
		expect(s.string.extends(s.never)).toBeFalsy()

		expect(s.unknown.extends(s.never)).toBeFalsy()

		expect(s.null.extends(s.never)).toBeFalsy()
		expect(s.undefined.extends(s.never)).toBeFalsy()
	})
})
