// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { Transactor } from '~/Transactor/Transactor'

import {
	assertInTransaction,
	assertNotInTransaction,
} from './assertInTransaction'

describe('assertInTransaction', () => {
	it('works when not in transaction', () => {
		const transactor = new Transactor()

		expect(() => {
			assertInTransaction({ transactor })
		}).toThrow('expected to be in transaction')

		expect(() => {
			assertNotInTransaction({ transactor })
		}).not.toThrow()
	})
})
