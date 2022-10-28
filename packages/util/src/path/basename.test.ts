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
