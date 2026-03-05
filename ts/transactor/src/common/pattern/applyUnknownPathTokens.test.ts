// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import { applyUnknownPathTokens } from './applyUnknownPathTokens'

describe('applyUnknownPathTokens', () => {
	it('works', () => {
		expect.hasAssertions()

		const a = applyUnknownPathTokens('test/{a}/*/**/{b}/{oops}', [
			'x',
			'y',
			'z',
			'w',
		] as const)

		expect(a).toBe('test/x/y/z/w/{oops}')

		$Assert<IsIdentical<typeof a, 'test/x/y/z/w/{oops}'>>()
	})
})
