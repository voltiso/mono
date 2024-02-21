// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { deserialize, registerCustom, serialize } from 'superjson'
import type { JSONObject } from 'superjson/dist/types'

import { blackbox } from './Blackbox'

// const isCjs = typeof require === 'function'
// console.log('Blackbox.test.ts', { isCjs })

// eslint-disable-next-line jest/require-hook
registerCustom<object, PropertyDescriptorMap & JSONObject>(
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
				values: [['custom', 'null-proto']],
			},
		})

		const aaa = deserialize(aa)

		expect(Object.getPrototypeOf(aaa)).toBeNull()

		// expect(Object.getPrototypeOf(aaa)).toBe(Object.prototype)
		expect(aaa).toMatchObject({ a: 1 })
	})
})
