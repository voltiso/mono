// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { OmitByValue } from './OmitByValue'
import { omitUndefined } from './OmitByValue'

describe('OmitByValue', () => {
	it('type', () => {
		expect.assertions(0)

		type A = OmitByValue<{ readonly a?: 'a'; b: 'b' }, unknown>
		$Assert<IsIdentical<A, {}>>()

		type B = OmitByValue<{ readonly a?: 'a'; b: 'b' }, 'b'>
		$Assert<IsIdentical<B, { readonly a?: 'a' }>>()
	})

	type ObjA = {
		readonly a?: 'aa'
		b: 'bb'
	}

	it('generic', <O extends ObjA>() => {
		expect.assertions(0)

		type A = OmitByValue<O, 'bb'>
		$Assert.is<{ [k in keyof O]: Exclude<O[k], 'bb'> }, A>()
	})

	it('omitUndefined', () => {
		const obj = {
			defined: 123,
			maybeDefined: 123 as number | undefined,
			maybeUndefined: undefined as number | undefined,
			alwaysUndefined: undefined,
		}

		$Assert<
			IsIdentical<
				typeof obj,
				{
					defined: number
					maybeDefined: number | undefined
					maybeUndefined: number | undefined
					alwaysUndefined: undefined
				}
			>
		>()

		const a = omitUndefined(obj)

		$Assert<
			IsIdentical<
				typeof a,
				{
					defined: number
					maybeDefined: number
					maybeUndefined: number
				}
			>
		>()
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			readonly a?: 'aa'
			b: 'bb'
		}
		const obj = {} as unknown as OmitByValue<Obj, 'bb'>
		// hit F12 here:
		void obj.a
	})
})
