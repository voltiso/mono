// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '@voltiso/util'
import { lazyPromise } from '@voltiso/util'

import { DocFieldPath } from '../DocFieldPath.js'
import type { DocRefBase_ } from '../DocRefBase.js'
import type { Null } from './Null.js'

export type NestedPromise<data, Exists> = PromiseLike<data | Null<Exists>> &
	(IsAny<data> extends true
		? any
		: {
				[k in keyof data]: DocFieldPath<data[k]>
		  })

export function dataOrNestedPromise<data, Exists extends boolean>(
	docRef: DocRefBase_,
	getPromise: () => PromiseLike<data | Null<Exists>>,
) {
	return new Proxy(lazyPromise(getPromise), {
		get: (target, p) => {
			if (typeof p === 'symbol' || p in target)
				return Reflect.get(target, p) as unknown
			else return new DocFieldPath(docRef._context, [p])
		},
	}) as unknown as NestedPromise<data, Exists>
}