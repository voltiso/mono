// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import { number } from '../s/number'
import type { GetOptions } from './GetOptions.js'

describe('GetOptions', () => {
	it('works', () => {
		expect.assertions(0)

		const a = number
		type A = GetOptions<typeof a>
		Assert.is<A, { isOptional: false; isReadonly: false; hasDefault: false }>()

		const b = number.readonly
		type B = GetOptions<typeof b>
		Assert.is<
			B,
			{
				isOptional: false
				isReadonly: true
				hasDefault: false
			}
		>()

		const e = number.optional.readonly
		type E = GetOptions<typeof e>
		Assert.is<
			E,
			{
				isOptional: true
				isReadonly: true
				hasDefault: false
			}
		>()
	})
})
