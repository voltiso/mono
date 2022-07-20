// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Props } from '../Props'
import type { FunctionComponent } from './FunctionComponent.js'
import type { IFunctionComponent } from './IFunctionComponent.js'

describe('FunctionComponent', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<FunctionComponent<P>, IFunctionComponent>()
	})
})
