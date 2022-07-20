// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '../nullish'
import { isPrimitive } from './Primitive.js'

describe('Primitive', () => {
	it('works', () => {
		expect.hasAssertions()
		expect(isPrimitive('a')).toBeTruthy()
		expect(isPrimitive(1)).toBeTruthy()
		expect(isPrimitive(BigInt(123))).toBeTruthy()
		expect(isPrimitive(Symbol('dfg'))).toBeTruthy()
		expect(isPrimitive(undef)).toBeTruthy()
		expect(isPrimitive(false)).toBeTruthy()
		expect(isPrimitive({})).toBeFalsy()
		expect(isPrimitive(() => {})).toBeFalsy()
	})
})
