// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'
import type {
	ExoticComponent,
	ForwardRefExoticComponent,
	NamedExoticComponent,
} from 'react'

import type { Props as Properties } from '../Props'
import type {
	IExoticComponent,
	IForwardRefExoticComponent,
	INamedExoticComponent,
} from './IForwardRefExoticComponent.js'

describe('IForwardRefExoticComponent', () => {
	it('generic', <P extends Properties>() => {
		expect.assertions(0)

		Assert.is<ExoticComponent<P>, IExoticComponent>()

		Assert.is<NamedExoticComponent<P>, INamedExoticComponent>()

		Assert.is<ForwardRefExoticComponent<P>, IForwardRefExoticComponent<P>>()
		Assert.is<ForwardRefExoticComponent<P>, IForwardRefExoticComponent>()
	})
})
