// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable testing-library/prefer-screen-queries */

import { undef } from '@voltiso/util'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { style } from '~'

import { renderApp } from './common'

describe('curried', () => {
	it('simple', () => {
		expect.hasAssertions()

		const myStyle = style.css({ color: 'red' })
		const MyText = myStyle(Text)
		const MyText2 = MyText.css({ margin: 8 })
		const { getByTestId } = renderApp(<MyText2 testID='a' />)

		const button = getByTestId('a')

		expect(button.props.style).toMatchObject({
			color: 'red',
			margin: 8,
		})
	})

	it('new props (required)', () => {
		expect.hasAssertions()

		const myStyle = style.newRequiredProps({ red: false }).css(p => ({
			color: p.red ? 'red' : undef,
		}))

		const MyView = myStyle(View)

		// @ts-expect-error `red` missing
		;<MyView />

		const MyView2 = MyView.newRequiredProp('bgRed', false).css(p => ({
			backgroundColor: p.bgRed ? 'red' : undef,
		}))

		// @ts-expect-error `red` missing
		;<MyView2 bgRed />

		// @ts-expect-error `bgRed` missing
		;<MyView2 red />

		const { getByTestId } = renderApp(
			<MyView2
				testID='a'
				red
				bgRed
			/>,
		)
		const button = getByTestId('a')

		expect(button.props.style).toMatchObject({
			color: 'red',
			backgroundColor: 'red',
		})
	})

	it('new props (optional & present)', () => {
		expect.hasAssertions()

		const myStyle = style
			.newProps({ red: false as boolean | undefined })
			.css(p => ({
				color: p.red ? 'red' : undef,
			}))

		const MyTouchableOpacity = myStyle(TouchableOpacity)
		const { getByTestId } = renderApp(
			<MyTouchableOpacity
				testID='a'
				red
			/>,
		)
		const button = getByTestId('a')

		expect(button.props.style).toMatchObject({
			color: 'red',
		})
	})

	it('new props (optional & not present)', () => {
		expect.hasAssertions()

		const myStyle = style
			.css({ color: 'purple' })
			.newProps({ red: false as boolean | undefined })
			.css(p => ({
				color: p.red ? 'red' : undef,
			}))

		const MyScrollView = myStyle(ScrollView)
		const { getByTestId } = renderApp(<MyScrollView testID='a' />)
		const button = getByTestId('a')

		expect(button.props.style).toMatchObject({
			color: 'purple',
		})
	})
})
