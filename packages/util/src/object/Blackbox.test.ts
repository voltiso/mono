// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
// import type { SuperJSON } from 'superjson'
import { deserialize, registerCustom, serialize } from 'superjson'

import { blackbox } from './Blackbox'

// type JSONValue = Parameters<typeof SuperJSON.serialize>[0] // ! broken
type JSONValue = never // well... `superjson` in its super-ness does not export this type for us

// const isCjs = typeof require === 'function'
// console.log('Blackbox.test.ts', { isCjs })

registerCustom<object, PropertyDescriptorMap & JSONValue>(
	{
		isApplicable(v): v is object {
			return Object.getPrototypeOf(v) === null
		},

		serialize(v) {
			return Object.getOwnPropertyDescriptors(v) as never
		},

		deserialize(descriptors) {
			const result = Object.create(null)
			Object.defineProperties(result, descriptors)
			return result as never
		},
	},
	'null-proto',
)

describe('Blackbox', () => {
	it('works', () => {
		const a = blackbox({ a: 1 })

		expect(Object.getPrototypeOf(a)).toBeNull()
	})

	it('superjson', () => {
		const a = blackbox({ a: 1 })

		const aa = serialize(a)

		expect(aa).toStrictEqual({
			json: {
				a: {
					configurable: false,
					enumerable: false,
					value: 1,
					writable: false,
				},
			},

			meta: {
				v: 1, // this is new (suprejson update?)
				values: [['custom', 'null-proto']],
			},
		})

		const aaa = deserialize(aa)

		expect(Object.getPrototypeOf(aaa)).toBeNull()

		// expect(Object.getPrototypeOf(aaa)).toBe(Object.prototype)
		expect(aaa).toMatchObject({ a: 1 })
	})
})
