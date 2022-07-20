// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_,
	exactOptionalPropertyTypes,
	IsIdentical,
	MapOrUndefined,
	PickOptional,
	strictNullChecks,
	UndefinedFromOptional,
} from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'
import type { ComponentProps } from 'react'

import { style } from '../../../../src'

describe('defineProps', () => {
	it('compiler options is set', () => {
		expect.assertions(0)

		Assert.is<strictNullChecks, true>()
		Assert.is<exactOptionalPropertyTypes, false>()
	})

	it('allows undefined default', () => {
		expect.assertions(0)

		type MyProps = {
			magic?: boolean
		}

		type X = _<
			Partial<UndefinedFromOptional<MyProps>> &
				MapOrUndefined<Required<PickOptional<Omit<MyProps, 'children'>>>>
		>
		Assert<IsIdentical<X, { magic: boolean | undefined }>>()

		//
		const a = style('button').defineProps<MyProps>({ magic: undef })
		type A = Pick<ComponentProps<typeof a>, 'magic'>
		Assert<IsIdentical<A, { magic?: boolean | undefined }>>()
	})
})
