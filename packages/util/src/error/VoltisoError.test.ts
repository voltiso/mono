// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from './VoltisoError'

describe('VoltisoError', () => {
	it('works with package name', () => {
		expect.hasAssertions()

		const error = new VoltisoError('test', { package: { name: 'pName' } })

		expect(error.message).toBe('[pName] test')
	})

	it('works with package name and version', () => {
		expect.hasAssertions()

		const error = new VoltisoError('test', {
			package: { name: 'pName', version: '1.0.0' },
		})

		expect(error.message).toBe('[pName@1.0.0] test')
	})

	it('works with just a message', () => {
		expect.hasAssertions()

		const error = new VoltisoError('test')

		expect(error.message).toBe('test')
	})
})
