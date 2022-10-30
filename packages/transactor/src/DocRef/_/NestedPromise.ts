// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '@voltiso/util'
import { lazyPromise } from '@voltiso/util'

import type { UnknownDocRefBase } from '~/DocRef'
import { DocFieldPath } from '~/DocRef'

import type { Null } from './Null'

export type NestedPromise<data, Exists> = PromiseLike<data | Null<Exists>> &
	(IsAny<data> extends true
		? any
		: {
				[k in keyof data]: DocFieldPath<data[k]>
		  })

export function dataOrNestedPromise<data, Exists extends boolean>(
	docRef: UnknownDocRefBase,
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
