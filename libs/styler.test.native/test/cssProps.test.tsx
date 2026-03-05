// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type {
	IStylable,
	IStylableJsxCall,
	IsReactNative,
} from '@voltiso/styler'
import { style } from '@voltiso/styler'
import { $Assert } from '@voltiso/util'
import type { ForwardRefExoticComponent } from 'react'
import { View } from 'react-native'

import { renderApp } from './common'

describe('cssProps', () => {
	it('works', () => {
		expect.hasAssertions()

		$Assert.is<IsReactNative, true>()

		// @ts-expect-error react-native
		const _a = style('button')
		// $Assert.is<typeof a, StaticError>()

		const StyledView = style(View)
		;() => <StyledView /> // check if optional

		$Assert.is<ForwardRefExoticComponent<{}>, IStylable>()

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
