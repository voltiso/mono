// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, isPlainObject } from '@voltiso/util'

import * as s from '~'

class C {
	a = 1
}

const plain = {
	a: 1,
}

const nonPlain = new C()

describe('object', () => {
	it('type', () => {
		const a = s.object
		$Assert<IsIdentical<typeof a.Output, object>>()
		$Assert<IsIdentical<typeof a.Input, object>>()

		const b = s.object.plain
		$Assert<IsIdentical<typeof b.Output, object>>()
		$Assert<IsIdentical<typeof b.Input, object>>()

		const c = s.plainObject
		$Assert<IsIdentical<typeof c.Output, object>>()
		$Assert<IsIdentical<typeof c.Input, object>>()
	})

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

class CC {}

// eslint-disable-next-line jest/require-hook
$Assert.is<CC, object>()

const a = { a: 1 }

// eslint-disable-next-line jest/require-hook
$Assert.is<typeof a, object>()

/* eslint-disable jest/require-hook */

$Assert.is<{ a: 1 }, object>()
$Assert.is<Omit<number, 'toString'>, object>()
