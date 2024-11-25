// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { basename } from './basename'

describe('basename', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(basename('')).toBe('')
		expect(basename('/')).toBe('')
		expect(basename('///')).toBe('')
		expect(basename('test')).toBe('test')
		expect(basename('/test')).toBe('test')
		expect(basename('///test')).toBe('test')
		expect(basename('/a/b/test')).toBe('test')
		expect(basename('/a/b/test/')).toBe('test')
		expect(basename('/a/b/test///')).toBe('test')
	})
})
