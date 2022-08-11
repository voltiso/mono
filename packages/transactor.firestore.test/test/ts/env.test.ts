// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import 'zone.js'
import 'zone.js/fesm2015/zone-testing-node-bundle'

import { areArrowFunctionsTranspiled, isStrict } from '@voltiso/util'

describe('env', () => {
	it('use strict', () => {
		expect.hasAssertions()

		expect(isStrict).toBeTruthy()
	})

	it('arrow functions not transpiled', () => {
		expect.hasAssertions()

		expect(areArrowFunctionsTranspiled).toBeFalsy()
	})

	it('zone.js imported', () => {
		expect.hasAssertions()

		expect(Promise.name).toBe('ZoneAwarePromise')
	})

	it('zone.js imported and async-await transpiled', () => {
		expect.hasAssertions()

		expect((async () => {})().constructor.name).toBe('ZoneAwarePromise')
	})
})
