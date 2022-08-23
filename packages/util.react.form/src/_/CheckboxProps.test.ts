// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'
import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'

import type { CheckboxProps } from './CheckboxProps'

describe('CheckboxProps', () => {
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('generic', <E extends HTMLElement>() => {
	// 	expect.assertions(0)

	// 	Assert.is<ICheckboxProps<E>, ICheckboxProps>()
	// 	Assert.is<CheckboxProps<E>, ICheckboxProps>()
	// })

	it('type', () => {
		expect.assertions(0)

		Assert.is<ComponentPropsWithoutRef<'input'>, CheckboxProps>()

		Assert.is<CheckboxProps, ComponentPropsWithoutRef<'input'>>()
		Assert.is<CheckboxProps, ComponentPropsWithRef<'input'>>()
	})
})
