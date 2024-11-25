// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '@voltiso/util'
import { lazyPromise } from '@voltiso/util'

import { DocFieldPath } from '~/DocFieldPath'
import type { _CustomDocRef } from '~/DocRef'

export type NestedPromise<data, Exists> = PromiseLike<
	data | (Exists extends false ? null : never)
> &
	(IsAny<data> extends true
		? any
		: {
				[k in keyof data]: DocFieldPath<data[k]>
			})

export function dataOrNestedPromise<data, Exists extends boolean>(
	docRef: _CustomDocRef,
	getPromise: () => PromiseLike<data | (Exists extends false ? null : never)>,
): NestedPromise<data, Exists> {
	return new Proxy(lazyPromise(getPromise), {
		get: (target, p) => {
			if (typeof p === 'symbol' || p in target)
				return Reflect.get(target, p) as unknown
			else return new DocFieldPath(docRef._context, [p])
		},
	}) as unknown as NestedPromise<data, Exists>
}
