// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { ComponentProps, ReactNode } from 'react'
import { forwardRef } from 'react'

import { style } from '~'

describe('children', () => {
	it('implicit children for intrinsic elements', () => {
		const Button = style('button')

		const name = 'Test'

		;() => <Button>Test {name}</Button>

		type Children = ComponentProps<typeof Button>['children']
		$Assert<IsIdentical<Children, ReactNode>>()
	})

	it('no implicit children for React.forwardRef', () => {
		const Button = style('button')

		const Inner = forwardRef<HTMLButtonElement, {}>((props, ref) => (
			<Button ref={ref} {...props} />
		))

		// @ts-expect-error no `children` prop
		;() => <Inner>Test</Inner>

		const Component = style(Inner)

		// @ts-expect-error no `children` prop
		;() => <Component>Test</Component>
	})
})
