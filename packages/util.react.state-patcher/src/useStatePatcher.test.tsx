// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import 'jest-expect-message'

import { act, render, screen } from '@testing-library/react'
import type { FC } from 'react'

import type { StatePatcher } from './useStatePatcher'
import { useStatePatcher } from './useStatePatcher'

describe('useStatePatcher', () => {
	it('memoizes', () => {
		expect.hasAssertions()

		let state = {} as StatePatcher<{ a: string }>
		let prevState = state
		let renderId = 0

		const C: FC = () => {
			++renderId
			prevState = state
			state = useStatePatcher({ a: 'aa' })
			return <>{state.a}</>
		}

		const view = render(<C />)

		const c = screen.getByText('aa')

		const prevA = state.a

		// #1 - rerender

		view.rerender(<C />)

		expect(state.a).toBe(prevA)
		expect(state, 'state does not change on rerender').toBe(prevState)
		expect(c).toHaveTextContent('aa')

		// #2 - rerender (auto)
		act(() => {
			state.update({ a: 'bb' })
		})

		expect(c, 'state update should be triggered').toHaveTextContent('bb')
		expect(state, 'immutable pattern').not.toBe(prevState)
		expect(prevState.a, 'no stale values').toBe('bb')

		// #3 no re-render (same value)
		prevState = state
		let prevRaw = state.raw
		// eslint-disable-next-line testing-library/render-result-naming-convention
		let prevRenderId = renderId
		act(() => {
			state({ a: 'bb' })
		})

		expect(state.raw, 'value did not change').toBe(prevRaw)
		expect(renderId, 'no re-render').toBe(prevRenderId)

		//

		// #3-b no re-render (same value)
		prevState = state
		prevRaw = state.raw
		prevRenderId = renderId
		act(() => {
			state.set({ a: 'bb' })
		})

		expect(state.raw, 'value did not change').toBe(prevRaw)
		expect(renderId, 'no re-render').toBe(prevRenderId)

		//

		// #4 setter (shallow only)
		act(() => {
			state.a = 'setter'
		})

		expect(c).toHaveTextContent('setter')
	})

	it('destructure', () => {
		expect.hasAssertions()

		let state: any

		const C: FC = () => {
			state = useStatePatcher({ a: 'aa' })
			return <>{`Num keys: ${Object.keys({ ...state }).length.toString()}`}</>
		}

		render(<C />)

		expect(Object.keys({ ...state.raw })).toStrictEqual(['a'])

		const c = screen.getByText('Num keys: 1')

		expect(c).toHaveTextContent('Num keys: 1')
	})

	it('boolean', () => {
		expect.hasAssertions()

		let state: any

		const C: FC = () => {
			state = useStatePatcher({ a: true })
			return <div data-testid='a'>{state.a ? 'T' : 'F'}</div>
		}

		render(<C />)

		const c = screen.getByTestId('a')

		expect(c).toHaveTextContent('T')

		act(() => {
			state.a = false
		})

		expect(c).toHaveTextContent('F')
	})

	it('boolean (patch)', () => {
		expect.hasAssertions()

		let state: StatePatcher<{ a: boolean }>

		const C: FC = () => {
			state = useStatePatcher({ a: true })
			return <div data-testid='a'>{state.a ? 'T' : 'F'}</div>
		}

		render(<C />)

		const c = screen.getByTestId('a')

		expect(c).toHaveTextContent('T')

		act(() => {
			state.update({ a: false })
		})

		expect(c).toHaveTextContent('F')
	})
})
