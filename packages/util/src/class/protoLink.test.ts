// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'

import { protoLink } from './protoLink'

describe('protoLink', () => {
	it('works', () => {
		expect.assertions(0)

		const x = protoLink({ a: 1, b: 1 } as const, { b: 2, c: 2 } as const)
		$Assert(
			$Is(x).identicalTo<{ readonly a: 1; readonly b: 1; readonly c: 2 }>(),
		)

		// ! does not work with call signatures currently
		// const f = protoLink(() => 2, { a: 1 } as const)
		// $Assert.is<typeof f, { (): 2; a: 1 }>()
	})
})
