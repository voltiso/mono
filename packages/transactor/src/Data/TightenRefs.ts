// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema, SimplifySchema } from '@voltiso/schemar.types'
import type { BRAND, Merge2_ } from '@voltiso/util'

import type { DocRefLike, GetDocRef } from '~/DocRef'
import type { DocTag } from '~/DocTypes'

export type _TightenRefs<T> = T extends DocRefLike
	? GetDocRef<{
			doc: keyof T[BRAND]['transactor']['doc'] & DocTag
			isStrong: T['isStrong']
	  }>
	: T extends object
	? {
			[k in keyof T]: _TightenRefs<T[k]>
	  }
	: T

export type TightenRefs<S> = S extends $$Schema & {
	Output: unknown
	Input: unknown
}
	? SimplifySchema<
			Merge2_<
				S,
				{
					Output: _TightenRefs<S['Output']>
					Input: _TightenRefs<S['Input']>
				}
			>
	  >
	: _TightenRefs<S>
