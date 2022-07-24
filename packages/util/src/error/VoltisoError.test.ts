// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from './VoltisoError.js'

describe('VoltisoError', () => {
	it('works', () => {
		expect.hasAssertions()

		// eslint-disable-next-line unicorn/prefer-module
		const error = new VoltisoError(__dirname)

		expect(error.message).toBe('[@voltiso/util]')
	})
})
