// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { Assert } from '~/type'

import type { Entry } from './Entry'

describe('Entry', () => {
	it('type', () => {
		expect.assertions(0)

		type Obj = {
			[k: string]: number
			[k: number]: never
		}

		type A = Entry<Obj>
		Assert<IsIdentical<A, [string, number]>>()
	})
})
