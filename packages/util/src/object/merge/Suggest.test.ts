import { $Assert } from '~/$strip'
import type { Suggest } from './Suggest'

// eslint-disable-next-line etc/no-misused-generics
describe('Suggest', () => {
	it('works', <A>() => {
		$Assert.is<unknown, Suggest<A>>()
	})
})
