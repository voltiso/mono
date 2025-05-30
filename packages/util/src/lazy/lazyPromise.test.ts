// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import 'zone.js'

import { describe, expect, it } from '@jest/globals'

// import 'zone.js/fesm2015/zone-testing-node-bundle'
import { protoLink } from '~/class/protoLink'
import { sleep } from '~/promise/sleep'

import { lazyPromise } from './lazyPromise'

class DocumentReference {
	async get() {
		return Zone.current
	}

	constructor() {
		// eslint-disable-next-line sonarjs/no-async-constructor
		return new Proxy(
			protoLink(
				lazyPromise(() => this.get()),
				this,
			),
			{
				get: (target, p) => {
					if (typeof p === 'symbol' || p in target) {
						return Reflect.get(target, p) as unknown
					}

					return undefined
				},
			},
		) as never
	}
}

describe('lazyPromise', () => {
	it('zone.js imported correctly', () => {
		expect.hasAssertions()

		// eslint-disable-next-line promise/spec-only
		expect(Promise.name).toBe('ZoneAwarePromise')

		const promise = (async () => {})()

		expect(promise.constructor.name).toBe('ZoneAwarePromise')
	})

	it('does not execute until awaited', async () => {
		expect.hasAssertions()

		let executed = false

		async function func() {
			executed = true
		}
		const promise = lazyPromise(func)

		expect(executed).toBe(false)

		await promise

		expect(executed).toBe(true)
	})

	it('works with zone.js', async () => {
		expect.hasAssertions()

		async function func(index: number) {
			expect(Zone.current.name).toBe(String(index))
		}

		const func66 = lazyPromise(async () => {
			expect(Zone.current.name).toBe(`66`)

			return func(66)
		})

		await Promise.all(
			[...Array.from({ length: 100 }).keys()].map(index =>
				Zone.current
					.fork({ name: String(index) })
					.run<Promise<void>>(async () => {
						await sleep(100)

						expect(Zone.current.name).toBe(String(index))

						void func(index)
						await sleep(100)

						expect(Zone.current.name).toBe(String(index))

						// eslint-disable-next-line sonarjs/no-nested-functions
						await lazyPromise(() => func(index))
						await sleep(100)

						expect(Zone.current.name).toBe(String(index))

						if (index === 66) await func66

						expect(Zone.current.name).toBe(String(index))

						await sleep(100)
						const documentReference =
							new DocumentReference() as unknown as Promise<Zone>
						const r = await documentReference

						expect(r.name).toBe(String(index))
						expect(Zone.current.name).toBe(String(index))
					}),
			),
		)
	})
})
