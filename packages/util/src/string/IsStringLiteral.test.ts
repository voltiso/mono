// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'

import type { IsStringLiteral } from './IsStringLiteral'

describe('number/IsStringLiteral', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert(
			$Is<IsStringLiteral<'123' | '444'>>().true,
			$Is<IsStringLiteral<123 | 'asd'>>().boolean,
			$Is<IsStringLiteral<123>>().false,
			$Is<IsStringLiteral<string>>().false,
			$Is<IsStringLiteral<number | string>>().false,
			$Is<IsStringLiteral<string | 123>>().false,
			$Is<IsStringLiteral<number | 'asd'>>().boolean,
			$Is<IsStringLiteral<never>>().false,
			$Is<IsStringLiteral<any>>().false,
			$Is<IsStringLiteral<string & { secretField: 123 }>>().false,
			$Is<IsStringLiteral<(string & { secretField: 123 }) | '123'>>().boolean,
			$Is<IsStringLiteral<(string & { secretField: 123 }) | object>>().false,
			//
		)
	})
})
