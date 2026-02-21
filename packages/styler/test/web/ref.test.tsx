// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FC, RefObject } from 'react'
import { describe, expect, it } from 'vitest'

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
