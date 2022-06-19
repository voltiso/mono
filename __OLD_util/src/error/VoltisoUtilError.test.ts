import { VoltisoUtilError } from './VoltisoUtilError'

describe('TsUtilError', () => {
	it('works', () => {
		expect.hasAssertions()

		const error = new VoltisoUtilError()
		expect(error.message).toBe('[@voltiso/util]')
	})
})
