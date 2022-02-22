import { Assert } from './assert'
import { IsCompatible } from './IsEqual'
import { ListParity } from './list'

describe('list', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsCompatible<ListParity<[]>, 0>>()
		Assert<IsCompatible<ListParity<[0, 0, 0, 0]>, 0>>()
		Assert<IsCompatible<ListParity<[0, 0, 0]>, 1>>()
		Assert<IsCompatible<ListParity<Date>, never>>()
		Assert<IsCompatible<ListParity<unknown[]>, 0 | 1>>()
		Assert<IsCompatible<ListParity<[0] | [0, 0, 0]>, 1>>()
		Assert<IsCompatible<ListParity<[0] | [0, 0, 0, 0]>, 0 | 1>>()
	})
})
