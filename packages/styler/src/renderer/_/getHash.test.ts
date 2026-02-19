// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { getHash32Str } from './getHash'

describe('getHash', () => {
	it('simple', () => {
		/* cspell:disable-next-line */
		expect(getHash32Str('dupfaggffg')).toBe('wGi-ZA')
	})
})
