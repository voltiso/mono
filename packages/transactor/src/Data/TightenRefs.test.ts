// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema, SimpleSchema } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	CustomStrongDocRef,
	CustomWeakDocRef,
	StrongDocRefLike,
	WeakDocRefLike,
} from '~/DocRef'

import type { TightenRefs } from './TightenRefs'

describe('RelaxRefs', () => {
	it('simple', () => {
		type X = TightenRefs<
			Schema<{
				strong: StrongDocRefLike<'oops'>
				weak: WeakDocRefLike<'oops'>
			}>
		>

		$Assert<
			IsIdentical<
				X,
				SimpleSchema<{
					weak: CustomWeakDocRef<{ doc: 'oops' }>
					strong: CustomStrongDocRef<{ doc: 'oops' }>
				}>
			>
		>()
	})
})
