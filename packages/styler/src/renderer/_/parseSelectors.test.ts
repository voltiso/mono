// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { parseSelectors } from './parseSelectors'

describe('parseSelectors', () => {
	it('not a selector', () => {
		expect(parseSelectors('div')).toStrictEqual({
			mediaQueries: [],
			selectors: ['& div'],
		})
	})

	it('single', () => {
		expect(parseSelectors('a')).toStrictEqual({
			mediaQueries: [],
			selectors: ['& a'],
		})
	})

	it('whitespace', () => {
		expect(parseSelectors(' a,   &   > a ')).toStrictEqual({
			mediaQueries: [],
			selectors: ['& a', '&   > a'],
		})
	})
})
