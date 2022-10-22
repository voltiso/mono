// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'

import type { Path } from './Path'

describe('Path', () => {
	it('type', () => {
		expect.assertions(0)

		type Obj = {
			a: {
				b: {
					c: 0
				}
			}
		}

		$Assert($Is<['a', 'a']>().not.subtypeOf<Path<Obj>>())
	})
})
