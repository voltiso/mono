// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FC, RefObject } from 'react'

import { style } from '~'

import { renderApp } from './common'

describe('ref', () => {
	it('works', () => {
		expect.hasAssertions()

		const Button = style('button')

		const ref: RefObject<HTMLButtonElement> = { current: null }

		const Component: FC = () => {
			//
			return <Button ref={ref} />
		}

		renderApp(<Component />)

		const button = ref.current

		expect(button).toBeInstanceOf(HTMLButtonElement)
	})
})
