// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { MergeProps_ } from './MergeProps'
import type { Props } from './Props'

describe('MergeProps', () => {
	it('simple', () => {
		expect.assertions(0)

		type A = MergeProps_<{ a: 1 }, { b: 2 }>
		$Assert<
			IsIdentical<
				A,
				{
					// [k: string]: unknown
					// [k: number]: never
					// [k: symbol]: never
					a: 1
					b: 2
				}
			>
		>()
	})

	it('generic', <P0 extends Props, P1 extends Props>() => {
		expect.assertions(0)

		type A = MergeProps_<P0, P1>
		$Assert.is<A, Props>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('converts optionals to also undefined', () => {
	// 	expect.assertions(0)

	// 	type A = MergeProps<{ a?: 0 }, { b?: 0 }>
	// 	Assert<
	// 		IsIdentical<
	// 			A,
	// 			{
	// 				a?: 0 | undefined
	// 				b?: 0 | undefined
	// 			}
	// 		>
	// 	>()
	// })

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type ObjA = {
			a?: 0
		}

		type ObjB = {
			b?: 0
		}

		const obj = {} as MergeProps_<ObjA, ObjB>

		void obj.a
		void obj.b
	})
})
