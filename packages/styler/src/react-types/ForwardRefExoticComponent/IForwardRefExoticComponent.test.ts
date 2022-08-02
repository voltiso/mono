// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'
import type {
	ExoticComponent,
	ForwardRefExoticComponent,
	NamedExoticComponent,
} from 'react'

import type { Props } from '~/react-types'

import type {
	IExoticComponent,
	IForwardRefExoticComponent,
	INamedExoticComponent,
} from './IForwardRefExoticComponent'

describe('IForwardRefExoticComponent', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<ExoticComponent<P>, IExoticComponent>()

		Assert.is<NamedExoticComponent<P>, INamedExoticComponent>()

		Assert.is<ForwardRefExoticComponent<P>, IForwardRefExoticComponent<P>>()
		Assert.is<ForwardRefExoticComponent<P>, IForwardRefExoticComponent>()
	})
})
