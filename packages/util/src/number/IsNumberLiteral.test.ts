// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'

import type { IsNumberLiteral } from './IsNumberLiteral'

describe('number/IsNumberLiteral', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert(
			$Is<IsNumberLiteral<123 | 444>>().true,
			$Is<IsNumberLiteral<123 | 'asd'>>().boolean,
			$Is<IsNumberLiteral<'asd'>>().false,
			$Is<IsNumberLiteral<number>>().false,
			$Is<IsNumberLiteral<number | string>>().false,
			$Is<IsNumberLiteral<number | 'sdf'>>().false,
			$Is<IsNumberLiteral<123 | string>>().boolean,
			$Is<IsNumberLiteral<never>>().false,
			$Is<IsNumberLiteral<any>>().false,
			$Is<IsNumberLiteral<number & { secretField: 123 }>>().false,
			$Is<IsNumberLiteral<(number & { secretField: 123 }) | 123>>().boolean,
			$Is<IsNumberLiteral<(number & { secretField: 123 }) | object>>().false,
			//
		)
	})
})
