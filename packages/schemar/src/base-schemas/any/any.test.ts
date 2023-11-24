// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { AnyOptions, CustomAny, IAny, Input, Output, Schema } from '~'
import * as s from '~'

describe('any', () => {
	it('generic', <O extends Partial<AnyOptions>>() => {
		$Assert.is<IAny, Schema>()
		$Assert.is<CustomAny<O>, Schema>()
		$Assert.is<CustomAny<O>, IAny>()
	})

	it('simple', () => {
		$Assert.is<typeof s.any, Schema>()

		type A1 = Output<typeof s.any>
		type A2 = Input<typeof s.any>
		$Assert<IsIdentical<A1, any>>()
		$Assert<IsIdentical<A2, any>>()

		type B = s.Any['Output']
		$Assert.is<B, any>()

		type C = s.Any['Output']['optional']
		$Assert.is<C, any>()

		type D = s.Any['Output']['optional']['optional']
		$Assert.is<D, any>()

		type E = s.Any['Output']['optional']['readonly']
		$Assert.is<E, any>()

		const e = s.any.optional.readonly

		expect(e.isReadonly).toBeTruthy()
		expect(e.isOptional).toBeTruthy()

		$Assert.is<(typeof e)['isOptional'], true>()
		$Assert.is<(typeof e)['isReadonly'], true>()

		// type XX = any extends any ? true : false // true
		expect(s.any.extends(s.any)).toBeTruthy()

		// type AA = any extends never ? true : false // boolean
		// type BB = any extends number ? true : false // boolean
		// type CC = any extends unknown ? true : false // true

		expect(() => s.any.extends(s.never)).toThrow('boolean')
		expect(() => s.any.extends(s.number)).toThrow('boolean')
		expect(s.any.extends(s.unknown)).toBeTruthy()
		expect(s.any.extends(s.schema)).toBeTruthy()

		// type DD = any extends undefined ? true : false // boolean
		// type EE = number extends any ? true : false // true
		// type FF = string extends any ? true : false // true

		expect(() => s.any.extends(s.undefined)).toThrow('boolean')
		expect(s.number.extends(s.any)).toBeTruthy()
		expect(s.string.extends(s.any)).toBeTruthy()

		// type GG = unknown extends any ? true : false // true

		expect(s.unknown.extends(s.any)).toBeTruthy()

		// type HH = null extends any ? true : false // true
		// type II = undefined extends any ? true : false // true

		expect(s.null.extends(s.any)).toBeTruthy()
		expect(s.undefined.extends(s.any)).toBeTruthy()
	})
})
