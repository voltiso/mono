// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { render } from '@testing-library/react'
import type { FC } from 'react'
import { describe, expect, it } from 'vitest'

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
})
