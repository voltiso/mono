import type { IsIdentical } from '~/type'
import { $AssumeType } from './$AssumeType'
import { $Assert } from './static-assert'

describe('$AssumeType', () => {
	it('type', () => {
		const x = 0 as unknown as 'test' | number
		$AssumeType<string>(x) // now `x` is 'test'

		$Assert<IsIdentical<typeof x, 'test'>>()
	})
})
