// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema, SimpleSchema } from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { DocRef, DocRefLike, WeakDocRef, WeakDocRefLike } from '~/DocRef'

import type { RelaxRefs } from './RelaxRefs'

describe('RelaxRefs', () => {
	it('simple', () => {
		type X = RelaxRefs<
			Schema<{
				strong: DocRef<'oops'>
				weak: WeakDocRef<'oops'>

				strongAny: DocRef
				weakAny: WeakDocRef
			}>
		>

		$Assert<
			IsIdentical<
				X,
				SimpleSchema<{
					strong: DocRefLike<'oops'>
					weak: WeakDocRefLike<'oops'>

					strongAny: DocRefLike
					weakAny: WeakDocRefLike
				}>
			>
		>()
	})

	it('does not break id', () => {
		type A = RelaxRefs<{
			id: DocIdString<'oops'>
		}>

		$Assert<
			IsIdentical<
				A,
				{
					id: DocIdString<'oops'>
				}
			>
		>()
	})
})
