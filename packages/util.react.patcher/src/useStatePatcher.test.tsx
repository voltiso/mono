// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { act, render, screen } from '@testing-library/react'
import { BoundCallable, CALL } from '@voltiso/util'
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
		expect(state).toBe(prevState) // state does not change on rerender
		expect(c).toHaveTextContent('aa')

		// #2 - rerender (auto)
		act(() => {
			state.update({ a: 'bb' })
		})

		expect(c).toHaveTextContent('bb') // state update should be triggered
		expect(state).not.toBe(prevState) // immutable pattern
		expect(prevState.a).toBe('bb') // no stale values

		// #3 no re-render (same value)
		// eslint-disable-next-line no-useless-assignment
		prevState = state
		let prevRaw = state.raw
		// eslint-disable-next-line testing-library/render-result-naming-convention
		let prevRenderId = renderId
		act(() => {
			state.update({ a: 'bb' })
		})

		expect(state.raw).toBe(prevRaw) // value did not change
		expect(renderId).toBe(prevRenderId) // no re-render

		//

		// #3-b no re-render (same value)
		// eslint-disable-next-line no-useless-assignment
		prevState = state
		prevRaw = state.raw
		prevRenderId = renderId
		act(() => {
			state.set({ a: 'bb' })
		})

		expect(state.raw).toBe(prevRaw) // value did not change
		expect(renderId).toBe(prevRenderId) // no re-render

		//

		// #4 setter (shallow only)
		act(() => {
			state.a = 'setter'
		})

		expect(c).toHaveTextContent('setter')
	})

	it('BoundCallable works', () => {
		expect.hasAssertions()

		class C {
			constructor() {
				return BoundCallable(this)
			}

			[CALL]() {
				return this
			}
		}

		const c = new C()

		expect({ ...c }).toStrictEqual({})

		/**
		 * Does not work if the arrow function inside `BoundCallable` implementation
		 * is transpiled into a regular `function(){}`
		 */
		// expect(Reflect.ownKeys(c)).toStrictEqual([])
	})

	it('destructure', () => {
		expect.hasAssertions()

		let state = undefined as unknown as StatePatcher<{ a: string }>

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
			return <div data-testid='aa'>{state.a ? 'T' : 'F'}</div>
		}

		render(<C />)

		const c = screen.getByTestId('aa')

		expect(c).toHaveTextContent('T')

		act(() => {
			state.update({ a: false })
		})

		expect(c).toHaveTextContent('F')
	})
})
