// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import srcSimple from '~/strip/simple'

// // eslint-disable-next-line es-x/no-import-meta
// const __dirname = path.dirname(new URL(import.meta.url).pathname)

describe('simple', () => {
	it('src', () => {
		expect(() => srcSimple(1)).toThrow('$fastAssert(0) failed')
	})

	it('dist', async () => {
		// eslint-disable-next-line import/dynamic-import-chunkname
		const distHello = (await import('../../dist/esm/strip/simple')).default
		// const distHello = require('../../dist/esm/strip/simple')
		// 	.default as typeof srcSimple

		expect(() => distHello(1)).not.toThrow()
	})
})
