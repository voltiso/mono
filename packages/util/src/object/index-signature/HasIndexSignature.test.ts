// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { $Assert } from '~/$strip'

import type {
	HasIndexSignature,
	HasNumberIndexSignature,
	HasStringIndexSignature,
	HasSymbolIndexSignature,
} from './HasIndexSignature'

describe('HasIndexSignature', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert<IsIdentical<HasIndexSignature<{ a: 0 }>, false>>()
		$Assert<IsIdentical<HasIndexSignature<{ (): void; a: 0 }>, false>>()
		$Assert<IsIdentical<HasIndexSignature<{ new (): void; a: 0 }>, false>>()
		$Assert<
			IsIdentical<HasIndexSignature<{ [k: string]: unknown; a: 0 }>, true>
		>()
		$Assert<IsIdentical<HasIndexSignature<{ a: 1 } & { b: 2 }>, false>>()

		$Assert<
			IsIdentical<
				HasIndexSignature<{ a: 1 } & { [k: number]: number; b: 2 }>,
				true
			>
		>()

		$Assert<
			IsIdentical<HasIndexSignature<{ [k: symbol]: unknown; a: 0 }>, true>
		>()

		//

		$Assert<
			IsIdentical<
				HasSymbolIndexSignature<{ [k: symbol]: unknown; a: 0 }>,
				true
			>,
			IsIdentical<
				HasSymbolIndexSignature<{ [k: number]: unknown; a: 0 }>,
				false
			>,
			IsIdentical<
				HasSymbolIndexSignature<{ [k: string]: unknown; a: 0 }>,
				false
			>
		>()

		//

		$Assert<
			IsIdentical<
				HasStringIndexSignature<{ [k: symbol]: unknown; a: 0 }>,
				false
			>,
			IsIdentical<
				HasStringIndexSignature<{ [k: number]: unknown; a: 0 }>,
				false
			>,
			IsIdentical<HasStringIndexSignature<{ [k: string]: unknown; a: 0 }>, true>
		>()

		//

		$Assert<
			IsIdentical<
				HasNumberIndexSignature<{ [k: number]: unknown; a: 0 }>,
				true
			>,
			IsIdentical<
				HasNumberIndexSignature<{ [k: symbol]: unknown; a: 0 }>,
				false
			>,
			IsIdentical<
				HasNumberIndexSignature<{ [k: string]: unknown; a: 0 }>,
				false
			>
		>()
	})
})
