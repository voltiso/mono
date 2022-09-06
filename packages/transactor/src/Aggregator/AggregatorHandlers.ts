// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type } from '@voltiso/schemar.types'
import type { MaybePromise } from '@voltiso/util'

import type { DocLike, GetDataWithId, NestedData, RefLike } from '~'
import type { DocConstructorLike } from '~/Doc/DocConstructor'
import type { DTI } from '~/Doc/DocTI'
import type { DocTypes } from '~/DocTypes'
import type { WeakDocRef } from '~/Ref/WeakDocRef'

export interface IAggregatorHandlers {
	initialValue?: unknown

	filter?(this: object): boolean | PromiseLike<boolean>
	target(this: object): RefLike | MaybePromise<DocLike> //! Promise<IRef> - ! how to support promises??

	autoCreateTarget?: boolean | undefined

	include(this: object, acc: unknown): MaybePromise<unknown>
	exclude(this: object, acc: unknown): MaybePromise<unknown>
}

export interface AggregatorHandlers<
	This extends DocConstructorLike,
	Target extends DocConstructorLike,
	Name extends keyof Target[DTI]['aggregates'],
	InitialValue extends NestedData | undefined = undefined,
> extends IAggregatorHandlers {
	initialValue?: InitialValue

	filter?(this: GetDataWithId<This[DTI]>): boolean

	target(
		this: GetDataWithId<This[DTI]>,
	):
		| WeakDocRef<DocTypes[Target[DTI]['tag']]>
		| MaybePromise<DocTypes[Target[DTI]['tag']]>

	include(
		this: GetDataWithId<This[DTI]>,
		acc: Type<Target[DTI]['aggregates'][Name]> | InitialValue,
	): MaybePromise<Type<Target[DTI]['aggregates'][Name]>>

	exclude(
		this: GetDataWithId<This[DTI]>,
		acc: Type<Target[DTI]['aggregates'][Name]>,
	): MaybePromise<Type<Target[DTI]['aggregates'][Name]>>
}
