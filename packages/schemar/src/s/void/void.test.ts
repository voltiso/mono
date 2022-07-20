// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetInputType, GetOutputType } from '../../GetType'
import type { IRootSchema } from '../../schema'
import * as s from '..'
import type { VoidOptions } from './_/VoidOptions.js'
import type { CustomVoid } from './CustomVoid.js'

describe('void', () => {
	it('generic', <O extends VoidOptions>() => {
		expect.assertions(0)

		Assert.is<s.IVoid<O>, s.IVoid>()
		Assert.is<CustomVoid<O>, s.IVoid<O>>()
		Assert.is<CustomVoid<O>, s.IVoid>()
	})

	it('simple', () => {
		expect.hasAssertions()

		Assert.is<typeof s.void, IRootSchema>()

		type A1 = GetOutputType<typeof s.void>
		type A2 = GetInputType<typeof s.void>
		Assert<IsIdentical<A1, void>>()
		Assert<IsIdentical<A2, void>>()

		type B = s.Void['OutputType']
		Assert.is<B, void>()

		const e = s.void.optional.readonly

		expect(e.isReadonly).toBeTruthy()
		expect(e.isOptional).toBeTruthy()

		Assert.is<typeof e['isOptional'], true>()
		Assert.is<typeof e['isReadonly'], true>()

		expect(s.void.extends(s.void)).toBeTruthy()
		expect(s.void.extends(s.never)).toBeFalsy()

		expect(s.void.extends(s.number)).toBeFalsy()
		expect(s.void.extends(s.unknown)).toBeTruthy()

		expect(s.number.extends(s.void)).toBeFalsy()
		expect(s.string.extends(s.void)).toBeFalsy()

		expect(s.unknown.extends(s.void)).toBeFalsy()

		expect(s.null.extends(s.void)).toBeFalsy()

		// type X = void extends undefined ? 1 : 0
		// type X = undefined extends void ? 1 : 0

		expect(s.void.extends(s.undefined)).toBeFalsy()
		expect(s.undefined.extends(s.void)).toBeTruthy()

		// type X = void extends null ? 1 : 0
		// type X = null extends void ? 1 : 0

		expect(s.void.extends(s.null)).toBeFalsy()
		expect(s.null.extends(s.void)).toBeFalsy()
	})
})
