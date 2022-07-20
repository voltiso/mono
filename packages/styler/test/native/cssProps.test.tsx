// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'
import { View } from 'react-native'

import type { IsReactNative } from '../../src'
import { style } from '../../src'
import { renderApp } from './common'

describe('cssProps', () => {
	it('works', () => {
		expect.hasAssertions()

		Assert.is<IsReactNative, true>()

		// @ts-expect-error not available in react-native mode
		;() => style('button')

		const StyledView = style(View)

		const MyView = StyledView.cssProps('flex', 'backgroundColor', 'margin')
		;<MyView /> // check if optional
		const { getByTestId } = renderApp(
			<MyView
				testID='a'
				flex={1}
				backgroundColor='red'
			/>,
		)

		// eslint-disable-next-line testing-library/prefer-screen-queries
		const button = getByTestId('a')

		expect(button.props.style).toMatchObject({
			flex: 1,
			backgroundColor: 'red',
		})
	})
})
