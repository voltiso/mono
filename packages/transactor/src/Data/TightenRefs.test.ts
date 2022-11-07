// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema, SimpleSchema } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { DocRef, DocRefLike, WeakDocRef, WeakDocRefLike } from '~/DocRef'

import type { TightenRefs } from './TightenRefs'

describe('RelaxRefs', () => {
	it('simple', () => {
		type X = TightenRefs<
			Schema<{
				strong: DocRefLike<'oops'>
				weak: WeakDocRefLike<'oops'>
				strongAny: DocRefLike
				weakAny: WeakDocRefLike
			}>
		>

		$Assert.is<
			X,
			SimpleSchema<{
				strong: DocRef<'oops'>
				weak: WeakDocRef<'oops'>
				strongAny: DocRef
				weakAny: WeakDocRef
			}>
		>()
	})

	it('does not break id', () => {
		type A = TightenRefs<{
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
