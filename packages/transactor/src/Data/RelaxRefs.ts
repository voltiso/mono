// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schema,
	$$Schemable,
	SimplifySchema,
} from '@voltiso/schemar.types'
import type { BRAND, Merge2_ } from '@voltiso/util'

import type { DocRefLike, WeakDocRefLike } from '~/DocRef'
import type { DocTag } from '~/DocTypes'

export type _RelaxRefs<T> = T extends WeakDocRefLike
	? [T] extends [DocRefLike]
		? DocRefLike<keyof T[BRAND]['transactor']['doc'] & DocTag>
		: WeakDocRefLike<keyof T[BRAND]['transactor']['doc'] & DocTag>
	: T extends object
	? {
			[k in keyof T]: _RelaxRefs<T[k]>
	  }
	: T

export type RelaxRefs<S extends $$Schemable> = S extends $$Schema & {
	Output: unknown
	Input: unknown
}
	? SimplifySchema<
			Merge2_<
				S,
				{
					Output: _RelaxRefs<S['Output']>
					Input: _RelaxRefs<S['Input']>
				}
			>
	  >
	: _RelaxRefs<S>
