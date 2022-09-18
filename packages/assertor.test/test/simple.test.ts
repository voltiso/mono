// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import srcSimple from '~/simple'

describe('simple', () => {
	it('src', () => {
		expect(() => srcSimple(1)).toThrow('[@voltiso/assertor] $assert(0) failed')
	})

	it('dist', async () => {
		const distHello = require('../dist/cjs/simple').default as typeof srcSimple

		expect(() => distHello(1)).not.toThrow()
	})
})
