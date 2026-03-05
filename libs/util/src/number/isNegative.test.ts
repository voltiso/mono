// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'
import { describe, expect, it } from 'vitest'

import type { IsNegative } from './IsNegative'

describe('number/IsNegative', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert(
			$Is<IsNegative<-123 | 444>>().boolean,
			$Is<IsNegative<-123 | 'sdf'>>().boolean,
			$Is<IsNegative<-123 | -33>>().true,
			$Is<IsNegative<123 | 33>>().false,
			$Is<IsNegative<'ggg'>>().false,
			$Is<IsNegative<never>>().false,
			$Is<IsNegative<number>>().boolean,
			$Is<IsNegative<unknown>>().boolean,
			$Is<IsNegative<any>>().boolean,
			//
		)
	})
})
