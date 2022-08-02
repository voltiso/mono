// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	IsIdentical,
	PickCallNoUnknown_,
	PickConstructNoUnknown_,
} from '@voltiso/util'
import { Assert, Is } from '@voltiso/util'
import type { ComponentClass, FC } from 'react'

import type { Props } from '~/react-types/Props/Props'
import type {
	StylableJsxCall,
	StylableJsxCall_Infer,
} from '~/Stylable/_/StylableJsxCall'
import type { InnerProps } from '~/Stylable/InnerProps'

import type { StylableJsxConstruct } from './AutoStylableJsxConstruct'
import type {
	IStylableJsxConstruct,
	StylableJsxConstruct_,
} from './StylableJsxConstruct'

describe('StylableJsx', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<StylableJsxConstruct<P>, IStylableJsxConstruct>()
		Assert.is<StylableJsxConstruct<P>, StylableJsxConstruct>()
	})

	it('type', () => {
		expect.assertions(0)

		Assert(
			Is<ComponentClass<{ a?: 'aa' }>>().not.subtypeOf<IStylableJsxConstruct>(),
		)

		Assert(
			Is<ComponentClass<{ a?: 'aa' }>>().not.subtypeOf<StylableJsxConstruct>(),
		)

		Assert.is<
			ComponentClass<{ className?: string | undefined }>,
			StylableJsxConstruct
		>()

		Assert.is<
			ComponentClass<{ className?: string | undefined; a?: 'aa' }>,
			StylableJsxConstruct
		>()

		Assert.is<
			ComponentClass<{ className: string; a?: 'aa' }>,
			IStylableJsxConstruct
		>()

		Assert.is<
			ComponentClass<{ readonly className: string; a?: 'aa' }>,
			StylableJsxConstruct
		>()

		Assert.is<
			ComponentClass<{ readonly className?: 'a' | 'b' | undefined; a?: 'aa' }>,
			StylableJsxConstruct
		>()

		//

		Assert.is<FC<{ className: string; a?: 'aa' }>, StylableJsxCall>()
	})

	it('type #2', () => {
		expect.assertions(0)

		function get<P extends InnerProps>(
			_component:
				| PickCallNoUnknown_<StylableJsxCall_Infer<P>>
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
