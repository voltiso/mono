// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import srcSimple from '~/strip/simple'

// const __dirname = path.dirname(new URL(import.meta.url).pathname)

describe('simple', () => {
	it('src', () => {
		expect(() => srcSimple(1)).toThrow('$fastAssert(0) failed')
	})

	it('dist', async () => {
		// ignores knip unused file warning
		;() => import('~/strip/simple')

		// biome-ignore lint/suspicious/noTsIgnore: sometimes triggers
		// @ts-ignore might not be compiled yet
		const distHello = (await import('../../dist/esm/strip/simple')).default
		// const distHello = require('../../dist/esm/strip/simple')
		// 	.default as typeof srcSimple

		expect(() => distHello(1)).not.toThrow()
	})
})
