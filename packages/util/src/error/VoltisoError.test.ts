// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from './VoltisoError.js'

describe('VoltisoError', () => {
	it('works', () => {
		expect.hasAssertions()

		const error = new VoltisoError()

		expect(error.message).toBe('[@voltiso/util]')
	})
})
