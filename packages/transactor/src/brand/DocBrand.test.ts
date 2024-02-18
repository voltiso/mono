// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '@voltiso/util'

import type { DocBrand } from './DocBrand'

describe('DocBrand', () => {
	it('works', () => {
		$Assert.is<
			DocBrand<'anotherTest' | 'my-tag-data-1'>,
			DocBrand<'anotherTest'> & DocBrand<'my-tag-data-1'>
		>()

		$Assert.is<
			DocBrand<'anotherTest'> & DocBrand<'my-tag-data-1'>,
			DocBrand<'anotherTest' | 'my-tag-data-1'>
		>()

		$Assert(
			$Is<DocBrand<'anotherTest'>>().not.subtypeOf<DocBrand<'my-tag-data-1'>>(),

			$Is<DocBrand<'anotherTest' | 'my-tag-data-1'>>().subtypeOf<
				DocBrand<'anotherTest'>
			>(),

			$Is<DocBrand<'anotherTest'>>().subtypeOf<DocBrand<never>>(),
		)
	})
})
