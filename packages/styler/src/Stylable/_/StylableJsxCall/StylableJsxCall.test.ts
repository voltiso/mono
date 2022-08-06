// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	IsIdentical,
	PickCallNoUnknown_,
	PickConstructNoUnknown_,
} from '@voltiso/util'
import { Assert, Is } from '@voltiso/util'
import type { FC } from 'react'

import type { Props } from '~/react-types'
import type { InnerProps } from '~/Stylable'
import type { StylableJsxConstruct_ } from '~/Stylable/_/StylableJsxConstruct'

import type { StylableJsxCall } from './AutoStylableJsxCall'
import type { IStylableJsxCall, StylableJsxCallInfer } from './StylableJsxCall'

describe('StylableJsxCall', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<StylableJsxCall<P>, IStylableJsxCall>()
		Assert.is<StylableJsxCall<P>, StylableJsxCall>()
	})

	it('type', () => {
		expect.assertions(0)

		Assert(Is<FC<{ a?: 'aa' }>>().not.subtypeOf<IStylableJsxCall>())
		Assert(Is<FC<{ a?: 'aa' }>>().not.subtypeOf<StylableJsxCall>())

		Assert.is<FC<{ className?: string | undefined }>, StylableJsxCall>()

		Assert.is<
			FC<{ className?: string | undefined; a?: 'aa' }>,
			StylableJsxCall
		>()

		Assert.is<FC<{ className: string; a?: 'aa' }>, IStylableJsxCall>()
		Assert.is<FC<{ readonly className: string; a?: 'aa' }>, StylableJsxCall>()

		Assert.is<
			FC<{ readonly className?: 'a' | 'b' | undefined; a?: 'aa' }>,
			StylableJsxCall
		>()

		//

		Assert.is<FC<{ className: string; a?: 'aa' }>, StylableJsxCall>()
	})

	it('type #2', () => {
		expect.assertions(0)

		function get<P extends InnerProps>(
			_component:
				| PickCallNoUnknown_<StylableJsxCallInfer<P>>
				| PickConstructNoUnknown_<StylableJsxConstruct_<P>>,
		): P {
			return 0 as never
		}

		const a = get(0 as unknown as FC<{ className: string; a: string }>)
		Assert<
			IsIdentical<
				typeof a,
				{
					className: string
					a: string
				}
			>
		>()
	})
})
