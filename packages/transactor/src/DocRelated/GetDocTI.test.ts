// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { $$DocTI, DocTI } from '~/Doc'
import type { $$DocRef } from '~/DocRef'

import type { $$DocRelatedLike } from './DocRelated'
import type { GetDocTI } from './GetDocTI'

describe('GetDocTI', () => {
	it('type', () => {
		type A = GetDocTI<$$DocRelatedLike>
		$Assert<IsIdentical<A, DocTI>>()

		type B = GetDocTI<$$DocTI>
		$Assert<IsIdentical<B, DocTI>>()

		type C = GetDocTI<$$DocRef>
		$Assert<IsIdentical<C, DocTI>>()
	})
})
