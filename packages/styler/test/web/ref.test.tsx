// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { FC, RefObject } from 'react'

import { style } from '~'

import { renderApp } from './common'

describe('ref', () => {
	it('works', () => {
		expect.hasAssertions()

		const Button = style('button')

		const ref: RefObject<HTMLButtonElement> = { current: null as never }

		const Component: FC = () => <Button ref={ref} />

		renderApp(<Component />)

		const button = ref.current

		expect(button).toBeInstanceOf(HTMLButtonElement)
	})
})
