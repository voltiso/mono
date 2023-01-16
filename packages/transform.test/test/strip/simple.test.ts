// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import srcSimple from '~/strip/simple'

describe('simple', () => {
	it('src', () => {
		expect(() => srcSimple(1)).toThrow('$assert(0) failed')
	})

	it('dist', async () => {
		const distHello = require('../../dist/esm/strip/simple')
			.default as typeof srcSimple

		expect(() => distHello(1)).not.toThrow()
	})
})
