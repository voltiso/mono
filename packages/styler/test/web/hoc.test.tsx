// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'

import type { Styled } from '~'
import { style } from '~'

import { renderApp } from './common'

describe('hoc', () => {
	it('works - want required prop', () => {
		expect.hasAssertions()

		type WantProps = {
			magic: boolean
		}

		// type A = $GetStyledProps<{
		// 	Props: WantProps
		// }>

		function withColor<C extends Styled<{ Props: WantProps }>>(styled: C) {
			return styled.css(p => ({
				color: p.magic ? 'purple' : 'white',
			}))
		}

		const RawButton = style('button')

		// @ts-expect-error `magic` missing
		;() => withColor(RawButton)

		const BeforeBad = RawButton.newProps({
			magic: true as const,
			// otherProp: 0,
		})

		// @ts-expect-error cannot assign optional `magic` to required `magic`
		;() => withColor(BeforeBad)

		const BeforeGood = style('button')
			.newRequiredProp('magic')
			.newRequiredProp('other')

		const AfterGood = withColor(BeforeGood)

		//
		;() => (
			// @ts-expect-error `other` is required
			<AfterGood magic css={{ borderRadius: 4 }} />
		)

		renderApp(<AfterGood magic css={{ borderRadius: 4 }} other />)
		const after = screen.getByRole('button')

		expect(after).toHaveStyle({
			color: 'purple',
			borderRadius: '4px',
		})
	})
})
