// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jest/no-commented-out-tests */
import { render } from '@testing-library/react'
import type { FC } from 'react'

import { useCurrent } from './useCurrent'

describe('useCurrent', () => {
	it('memoizes', () => {
		expect.hasAssertions()

		let lastVal

		const C: FC = () => {
			lastVal = useCurrent({ a: 1 })
			return null
		}

		const view = render(<C />)
		const prevVal = lastVal

		view.rerender(<C />)

		expect(lastVal).toBe(prevVal)
	})

	// it('seals', () => {
	// 	expect.hasAssertions()

	// 	let lastVal: { a?: number } = {}

	// 	const C: FC<{ a: number }> = p => {
	// 		lastVal = useCurrent({ a: p.a })
	// 		return null
	// 	}

	// 	const r = render(<C a={1} />)

	// 	lastVal.a = 2

	// 	r.rerender(<C a={3} />)

	// 	expect(lastVal).toStrictEqual({ a: 3 })
	// })
})
