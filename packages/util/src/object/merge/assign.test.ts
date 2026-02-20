// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/complexity/useArrowFunction: . */

import { describe, expect, it } from '@jest/globals'

import { assign } from './assign'

describe('assign', () => {
	it('function: arrow := arrow', () => {
		expect.assertions(0)

		const a = () => 123
		const b = () => 234

		assign(a, b)
	})

	it('function: normal := arrow', () => {
		expect.assertions(0)

		const a = function () {
			return 123
		}

		const b = () => 234

		assign(a, b)
	})

	it('function: arrow := normal', () => {
		expect.assertions(0)

		const a = () => 234

		const b = function () {
			return 123
		}

		assign(a, b)
	})

	it('function: normal := normal', () => {
		expect.assertions(0)

		const a = function () {
			return 234
		}

		const b = function () {
			return 123
		}

		assign(a, b)
	})
})
