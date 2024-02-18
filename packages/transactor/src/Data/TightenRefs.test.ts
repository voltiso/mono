// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { DocIdString } from '~/brand'

import type { TightenRefs } from './TightenRefs'

describe('TightenRefs', () => {
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('simple', () => {
	// 	type X = TightenRefs<
	// 		Schema<{
	// 			strong: DocRefLike<'oops'>
	// 			weak: WeakDocRefLike<'oops'>
	// 			strongAny: DocRefLike
	// 			weakAny: WeakDocRefLike
	// 		}>
	// 	>

	// 	$Assert.is<
	// 		X,
	// 		SimpleSchema<{
	// 			strong: DocRef<'oops'>
	// 			weak: WeakDocRef<'oops'>
	// 			strongAny: DocRef
	// 			weakAny: WeakDocRef
	// 		}>
	// 	>()
	// })

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
