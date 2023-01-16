// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { PropertyPath } from './PropertyPath'

describe('PropertyPath', () => {
	it('type', () => {
		expect.assertions(0)

		type Obj = {
			a: {
				b: {
					c: 0
				}
			}
		}

		type A = PropertyPath<Obj>

		$Assert<IsIdentical<A, ['a'] | ['a', 'b'] | ['a', 'b', 'c']>>()
	})
})
