// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from 'vitest'

import type { IsIdentical } from '~/type'

import type { AllowedValue } from './AllowedValue'

describe('AllowedValue', () => {
	it('type', () => {
		expect.assertions(0)

		type O = {
			a: 1
			b: 2
		}

		$Assert<IsIdentical<AllowedValue<O, keyof O>, 1 | 2>>()
		$Assert<IsIdentical<AllowedValue<O, 'a'>, 1>>()
	})

	// it('generic', <O extends object>() => {
	// 	expect.assertions(0)

	// 	Assert.is<O[keyof O], AllowedValue<O, keyof O>>()
	// })
})
