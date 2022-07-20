// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'

import type { StyledComponent } from '../../src'
import { style } from '../../src'
import { renderApp } from './common'

describe('hoc', () => {
	it('works - want required prop', () => {
		expect.hasAssertions()

		type WantProps = {
			magic: boolean
		}

		function withColor<P extends WantProps>(C: StyledComponent<P>) {
			return C.css(p => ({
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
			<AfterGood
				magic={true}
				css={{ borderRadius: 4 }}
			/>
		)

		renderApp(
			<AfterGood
				magic={true}
				css={{ borderRadius: 4 }}
				other
			/>,
		)
		const after = screen.getByRole('button')

		expect(after).toHaveStyle({
			color: 'purple',
			borderRadius: '4px',
		})
	})
})
