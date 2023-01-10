// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! randomly fails with (because of zone.js - but probably & hopefully only under jest):
// Unknown worker message type message
// @voltiso/transactor:test:     This is caused by either a bug in Node.js or incorrect usage of Node.js internals.
// @voltiso/transactor:test:     Please open an issue with this stack trace at https://github.com/nodejs/node/issues
// !

import 'zone.js'
import 'zone.js/fesm2015/zone-testing-node-bundle'

import { lazyPromise } from '@voltiso/util'

function sleep(ms: number) {
	return new Promise((resolve, reject) => {
		try {
			setTimeout(resolve, ms)
		} catch (error) {
			reject(error)
		}
	})
}

describe('zone', () => {
	it('patches Promise', () => {
		expect.hasAssertions()
		expect(Promise.name).toBe('ZoneAwarePromise')
	})

	it('patches global.Promise', () => {
		expect.hasAssertions()
		expect(global.Promise.name).toBe('ZoneAwarePromise')
	})

	it('patches implicit Promise', async () => {
		expect.hasAssertions()

		const f = async () => {}
		const p = f()

		expect(p.constructor.name).toBe('ZoneAwarePromise')

		await p
	})

	it('works with promises', async () => {
		expect.hasAssertions()

		const root = Zone.current
		const forked = root.fork({ name: 'forked' })

		expect(Zone.current).toBe(root)

		await Promise.all([
			forked.run<Promise<void>>(async () => {
				for (let i = 0; i < 10; ++i) {
					// console.log(Zone.current.name)
					expect(Zone.current.name).toBe('forked')

					await sleep(50)
				}
			}),

			root.run<Promise<void>>(async () => {
				for (let i = 0; i < 10; ++i) {
					// console.log(Zone.current.name)
					expect(Zone.current).toBe(root)

					await sleep(50)
				}
			}),
		])

		expect(Zone.current).toBe(root)
	})

	it('works with lazy promises', async () => {
		expect.hasAssertions()

		const root = Zone.current
		const forked = root.fork({ name: 'forked' })

		expect(Zone.current).toBe(root)

		await Promise.all([
			forked.run(async () => {
				for (let i = 0; i < 10; ++i) {
					// console.log(Zone.current.name)
					expect(Zone.current.name).toBe('forked')

					await lazyPromise(() => sleep(50))
				}
			}),
			root.run(async () => {
				for (let i = 0; i < 10; ++i) {
					// console.log(Zone.current.name)
					expect(Zone.current).toBe(root)

					await lazyPromise(() => sleep(50))
				}
			}),
		])

		expect(Zone.current).toBe(root)
	})

	it('works with instanceof Promise', async () => {
		expect.hasAssertions()

		const f = async () => {}
		const r = f()

		expect(r).toBeInstanceOf(Promise)

		await r
	})
})
