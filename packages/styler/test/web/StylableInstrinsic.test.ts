// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { IStylableIntrinsic, Props, StylableIntrinsic } from '~'

describe('StylableIntrinsic', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<StylableIntrinsic<P>, IStylableIntrinsic>()
	})

	it('every JSX intrinsic element has className?', () => {
		expect.assertions(0)
		// allows simplifying typings

		type All = _<keyof JSX.IntrinsicElements & string>
		type WithClassName = StylableIntrinsic<{}>

		Assert.is<All, WithClassName>()
	})

	it('every JSX intrinsic property is optional?', <K extends keyof JSX.IntrinsicElements>() => {
		expect.assertions(0)

		Assert.is<JSX.IntrinsicElements[K], {}>()
	})
})
