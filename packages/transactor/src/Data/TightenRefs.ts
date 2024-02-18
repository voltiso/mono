// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable, Newable, Primitive } from '@voltiso/util'

import type { DocTagFromBrand } from '~/brand'
import type { GetDocRef, WeakDocRefLike } from '~/DocRef'

export type TightenRefs<T> = T extends WeakDocRefLike
	? GetDocRef<{
			doc: DocTagFromBrand<T>
			isStrong: T['isStrong']
		}>
	: T extends Date | Primitive | Callable | Newable
		? T
		: T extends object
			? {
					[k in keyof T]: TightenRefs<T[k]>
				}
			: T

// export type TightenRefs<S> = S extends $$Schema & {
// 	Output: unknown
// 	Input: unknown
// }
// 	? SimplifySchema<
// 			$Merge_<
// 				S,
// 				{
// 					Output: _TightenRefs<S['Output']>
// 					Input: _TightenRefs<S['Input']>
// 				}
// 			>
// 	  >
// 	: _TightenRefs<S>
