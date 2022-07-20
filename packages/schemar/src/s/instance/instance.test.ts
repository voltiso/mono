// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import * as s from '..'
import type { InstanceOptions } from './_/InstanceOptions.js'
import type { CustomInstance } from './CustomInstance.js'
import type { IInstance } from './IInstance.js'

describe('instance', () => {
	it('generic', <O extends InstanceOptions>() => {
		expect.assertions(0)

		Assert.is<IInstance<O>, IInstance>()
		Assert.is<CustomInstance<O>, IInstance<O>>()
		Assert.is<CustomInstance<O>, IInstance>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(s.instance(Date).extends(s.instance(Date))).toBeTruthy()
		expect(s.instance(Date).extends(s.instance(Number))).toBeFalsy()
		expect(s.instance(Date).extends(s.string)).toBeFalsy()

		expect(s.instance(Date).isValid(new Date())).toBeTruthy()
		expect(s.instance(Date).isValid(123)).toBeFalsy()

		expect(s.schema(Date).isValid(Date)).toBeFalsy()
		expect(s.schema(Date).isValid(new Date())).toBeTruthy()
	})
})
