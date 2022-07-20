// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { IndexedProps, Props } from './Props.js'

describe('Props', () => {
	it('type', () => {
		expect.assertions(0)

		Assert.is<Props, IndexedProps>()
		Assert.is<IndexedProps, Props>()

		Assert.is<
			{
				[x: string]: unknown
				[x: number]: never
			},
			Props
		>()

		// IProps cannot have `never` number signature for this to work
		Assert.is<
			{
				[x: string]: unknown
			},
			Props
		>()

		Assert.is<{ asd: 123 }, Props>()

		// Assert(Is<{ [123]: 123 }>().not.subtypeOf<IProps>())

		// const sym = Symbol('sym')
		// Assert(Is<{ [sym]: 123 }>().not.subtypeOf<IProps>())

		type SomeProps2 = {
			[k: string]: boolean
		}
		Assert.is<SomeProps2, Props>()
	})

	it('interface', () => {
		expect.assertions(0)

		interface MyProps {
			magic: boolean
		}

		Assert.is<MyProps, Props>() // so we can't even have `[x: string]` signature...
	})

	it('generic', <PropName extends string>() => {
		expect.assertions(0)

		type SomeProps = { [k in PropName]?: boolean } & { [k: number]: 0 }
		Assert.is<SomeProps, Props>()

		type SomeProps2 = { [k in PropName]: boolean }
		Assert.is<SomeProps2, Props>() // this doesn't work - even with `[x: symbol]: never`
	})
})
