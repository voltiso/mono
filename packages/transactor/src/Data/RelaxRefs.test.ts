// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema, SimpleSchema } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { CustomDocRef, DocRefLike } from '~/DocRef'

import type { RelaxRefs } from './RelaxRefs'

describe('RelaxRefs', () => {
	it('simple', () => {
		type X = RelaxRefs<
			Schema<{
				ref: CustomDocRef<{
					doc: 'oops'
					isStrong: false
				}>
			}>
		>

		$Assert<
			IsIdentical<
				X,
				SimpleSchema<{
					ref: DocRefLike<'oops'>
				}>
			>
		>()
	})
})
