// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'
import type { IsIdentical, StaticError } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'
import type { ComponentProps, ReactNode } from 'react'

import type { StyledComponent } from '~'
import { style } from '~'

import { renderApp } from './common'

describe('defineProps', () => {
	it('works with interfaces', () => {
		expect.hasAssertions()

		interface MyProps {
			magic?: boolean
		}

		const Button = style('button')
			.defineProps<MyProps>({
				magic: false,
			})
			.css(props => ({
				color: props.magic ? 'purple' : 'black',
			}))

		renderApp(<Button magic />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'purple',
		})
	})

	it('requires providing defaults for optional props', () => {
		expect.assertions(0)

		type MyProps = {
			magic?: boolean
		}

		// @ts-expect-error need to provide defaults
		;() => style('button').defineProps<MyProps>({})

		const a = () => style('button').defineProps<MyProps>()
		type A = ReturnType<typeof a>
		Assert<
			IsIdentical<
				A,
				StaticError &
					'defineProps requires providing default values for optional props' & {
						missingDefaults: 'magic'
					}
			>
		>()
	})

	it('allows undefined default', () => {
		expect.assertions(0)

		type MyProps = {
			magic?: boolean
		}

		//
		;() => style('button').defineProps<MyProps>({ magic: undef })
	})

	it('does not require defaults for mandatory props', () => {
		expect.assertions(0)

		type MyProps = {
			magic: boolean
		}

		//
		;() => style('button').defineProps<MyProps>({})

		//
		const a = () => style('button').defineProps<MyProps>()
		type A = ReturnType<typeof a>
		Assert.is<A, StyledComponent>()
	})

	it('does not require default for children', () => {
		expect.assertions(0)

		interface MyProps {
			children?: ReactNode
		}

		//
		;() => style('div').defineProps<MyProps>({})

		//
		const a = () => style('div').defineProps<MyProps>()
		type A = ReturnType<typeof a>
		Assert.is<A, StyledComponent>()
	})

	it('does not require defaults for already present props', () => {
		expect.assertions(0)

		const Div = style('div').newCssProp('magic', { color: 'purple' })

		type B = Pick<ComponentProps<typeof Div>, 'magic'>
		Assert<IsIdentical<B, { magic?: boolean | undefined }>>()

		type MyProps = {
			magic?: number
			newProp?: string
		}

		//
		const NewDiv = Div.defineProps<MyProps>({ newProp: 'test' })
		type A = Pick<ComponentProps<typeof NewDiv>, 'magic' | 'newProp'>
		Assert<
			IsIdentical<
				A,
				{ magic?: number | undefined; newProp?: string | undefined }
			>
		>()
	})
})
