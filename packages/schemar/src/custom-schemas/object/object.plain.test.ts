// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isPlainObject } from '@voltiso/util'

import * as s from '~'

class C {
	a = 1
}

const plain = {
	a: 1,
}

const nonPlain = new C()

describe('object', () => {
	it('plain', () => {
		expect.hasAssertions()

		expect(isPlainObject(nonPlain)).toBeFalsy()

		expect(() => s.object.validate(plain)).not.toThrow()
		expect(() => s.object.validate(nonPlain)).not.toThrow()

		expect(() => s.object.plain.validate(plain)).not.toThrow()
		expect(() => s.object.plain.validate(nonPlain)).toThrow('plain')

		expect(() => s.object.plain({ a: s.number }).validate(plain)).not.toThrow()
		expect(() => s.object.plain({ a: s.number }).validate(nonPlain)).toThrow(
			'plain',
		)

		expect(() => s.object({ a: s.number }).plain.validate(plain)).not.toThrow()
		expect(() => s.object({ a: s.number }).plain.validate(nonPlain)).toThrow(
			'plain',
		)
	})
})
