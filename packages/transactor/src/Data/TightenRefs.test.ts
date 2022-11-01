// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema, SimpleSchema } from '@voltiso/schemar.types'
import { $Assert } from '@voltiso/util'

import type { DocRef, DocRefLike, WeakDocRef, WeakDocRefLike } from '~/DocRef'

import type { TightenRefs } from './TightenRefs'

describe('RelaxRefs', () => {
	it('simple', () => {
		type X = TightenRefs<
			Schema<{
				strong: DocRefLike<'oops'>
				weak: WeakDocRefLike<'oops'>
			}>
		>

		$Assert.is<
			X,
			SimpleSchema<{
				strong: DocRef<'oops'>
				weak: WeakDocRef<'oops'>
			}>
		>()
	})
})
