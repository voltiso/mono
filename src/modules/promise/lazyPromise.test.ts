/* eslint-disable max-statements */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constructor-return */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-magic-numbers */
import 'zone.js'
import { protoLink } from '../class'

import { lazyPromise } from './lazyPromise'

function implicitPromiseConstructorName() {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	return (async () => {})().constructor.name
}

function checkImplicitPromiseConstructorName() {
	const name = implicitPromiseConstructorName()

	// console.log(`[${moduleName}] implicit Promise constructor name: ${name}`)

	if (name !== 'ZoneAwarePromise') {
		throw new Error(
			`zone.js not imported correctly: implicit Promise constructor name === ${name}. Make sure to transpile to ES2016 or earlier.`
		)
	}
}

// eslint-disable-next-line jest/require-hook
checkImplicitPromiseConstructorName()

function sleep(time: number) {
	return new Promise<void>(r => {
		setTimeout(() => r(), time)
	})
}

class DocRef {
	async get() {
		return Zone.current
	}

	constructor() {
		return new Proxy(
			protoLink(
				lazyPromise(() => this.get()),
				this
			),
			{
				get: (target, p) => {
					if (typeof p === 'symbol' || p in target) {
						return Reflect.get(target, p) as unknown
					}
				},
			}
		) as any
	}
}

describe('lazyPromise', () => {
	it('does not execute until awaited', async () => {
		expect.hasAssertions()
		let executed = false
		// eslint-disable-next-line @typescript-eslint/require-await
		async function fun() {
			executed = true
		}
		const promise = lazyPromise(fun)
		expect(executed).toBe(false)
		await promise
		expect(executed).toBe(true)
	})

	it('works with zone.js', async () => {
		expect.hasAssertions()

		// eslint-disable-next-line @typescript-eslint/require-await
		async function fun(i: number) {
			expect(Zone.current.name).toBe(`${i}`)
		}

		// eslint-disable-next-line @typescript-eslint/require-await
		const fun66 = lazyPromise(() => {
			expect(Zone.current.name).toBe(`66`)
			return fun(66)
		})

		await Promise.all(
			[...Array(100).keys()].map(i =>
				Zone.current.fork({ name: `${i}` }).run<Promise<void>>(async () => {
					await sleep(100)
					expect(Zone.current.name).toBe(`${i}`)
					await fun(i)
					await sleep(100)
					expect(Zone.current.name).toBe(`${i}`)
					await lazyPromise(() => fun(i))
					await sleep(100)
					expect(Zone.current.name).toBe(`${i}`)
					// eslint-disable-next-line jest/no-conditional-in-test
					if (i === 66) await fun66
					expect(Zone.current.name).toBe(`${i}`)
					await sleep(100)
					const docRef = new DocRef() as unknown as Promise<Zone>
					const r = await docRef
					expect(r.name).toBe(`${i}`)
					expect(Zone.current.name).toBe(`${i}`)
				})
			)
		)
	})
})
