// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable testing-library/prefer-screen-queries */

import { $Assert } from '@voltiso/util'
import { View } from 'react-native'

import type { IsReactNative, IStylable, IStylableJsxCall } from '~'
import { style } from '~'

import { renderApp } from './common'

describe('cssProps', () => {
	it('works', () => {
		expect.hasAssertions()

		$Assert.is<IsReactNative, true>()

		// @ts-expect-error react-native
		const a = style('button')
		// Assert.is<typeof a, StaticError>()

		const StyledView = style(View)
		;() => <StyledView /> // check if optional

		$Assert.is<typeof StyledView, IStylable>()
		// Assert.is<typeof StyledView, IStylableJsxConstruct>()
		$Assert.is<typeof StyledView, IStylableJsxCall>()

		const MyView = StyledView.cssProps('flex', 'backgroundColor', 'margin')
		;() => <MyView /> // check if optional
		const { getByTestId } = renderApp(
			<MyView testID='a' flex={1} backgroundColor='red' />,
		)

		const button = getByTestId('a')

		expect(button.props.style).toMatchObject({
			flex: 1,
			backgroundColor: 'red',
		})
	})

	it('newCssProp', () => {
		expect.hasAssertions()

		const Button = style(View).newCssProp('red', { color: 'red' })
		;<Button /> // check if optional
		const { getByTestId } = renderApp(<Button red testID='a' />)

		const button = getByTestId('a')

		expect(button.props.style).toMatchObject({
			color: 'red',
		})
	})
})
