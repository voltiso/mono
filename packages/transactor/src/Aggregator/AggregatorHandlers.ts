// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

import type { DocLike, DocRefLike, GetDataWithId } from '~'
import type { DocConstructorLike } from '~/Doc/DocConstructor'
import type { DTI } from '~/Doc/DocTI'
import type { DocTypes } from '~/DocTypes-module-augmentation'
import type { WeakRef } from '~/Ref'

export interface IAggregatorHandlers {
	initialValue?: unknown

	filter?(this: object): boolean | PromiseLike<boolean>
	target(
		this: object,
	): MaybePromise<(DocLike | DocRefLike)[]> | MaybePromise<DocLike> | DocRefLike

	autoCreateTarget?: boolean | undefined

	include(this: object, acc: unknown): MaybePromise<unknown>
	exclude(this: object, acc: unknown): MaybePromise<unknown>
}

export interface AggregatorHandlers<
	This extends DocConstructorLike,
	Target extends { [DTI]: { aggregates: any; tag: any } },
	Acc,
> extends IAggregatorHandlers {
	initialValue?: Acc

	filter?(this: GetDataWithId<This[DTI]>): boolean

	target(
		this: GetDataWithId<This[DTI]>,
	):
		| MaybePromise<
				(DocTypes[Target[DTI]['tag']] | WeakRef<DocTypes[Target[DTI]['tag']]>)[]
		  >
		| MaybePromise<DocTypes[Target[DTI]['tag']]>
		| WeakRef<DocTypes[Target[DTI]['tag']]>

	include(
		this: GetDataWithId<This[DTI]>,
		acc: Acc, // | InitialValue
	): MaybePromise<Acc>

	exclude(this: GetDataWithId<This[DTI]>, acc: Acc): MaybePromise<Acc>
}
