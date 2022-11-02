// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schema,
	$$Schemable,
	SimplifySchema,
} from '@voltiso/schemar.types'
import type { Merge2_ } from '@voltiso/util'

import type { DocTagFromBrand } from '~/brand'
import type { DocRefLike, WeakDocRefLike } from '~/DocRef'

export type RelaxRefs<S extends $$Schemable> = S extends $$Schema & {
	Output: unknown
	Input: unknown
}
	? SimplifySchema<
			Merge2_<
				S,
				{
					Output: RelaxRefs.ForData<S['Output']>
					Input: RelaxRefs.ForData<S['Input']>
				}
			>
	  >
	: RelaxRefs.ForData<S>

export namespace RelaxRefs {
	export type ForData<T> = T extends WeakDocRefLike
		? T extends DocRefLike
			? DocRefLike<DocTagFromBrand<T>>
			: WeakDocRefLike<DocTagFromBrand<T>>
		: T extends object
		? {
				[k in keyof T]: ForData<T[k]>
		  }
		: T
}
