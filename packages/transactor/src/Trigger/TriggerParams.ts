// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathMatches } from '~/common'
import type { Id } from '~/Data'
import type { Db } from '~/Db'
import type { DocLike, DTI, IDoc } from '~/Doc'
import type { DocRefContext } from '~/DocRef'
import type { DocPath } from '~/Path'
import type { IntrinsicFields, VoltisoEntry } from '~/schemas'

export type TriggerParams<D extends DocLike = IDoc, This = D | null> = {
	doc: This
	__voltiso: VoltisoEntry

	path: DocPath<D[DTI]['tag']>
	id: Id<D>

	db: Db

	possiblyExists: boolean
} & PathMatches &
	DocRefContext

export type AfterTriggerParams<
	D extends DocLike = IDoc,
	This = D | null,
	Before extends boolean = boolean,
	After extends boolean = boolean,
> = TriggerParams<D, This> & {
	before: Before extends true
		? ReturnType<D['dataWithId']>
		: Before extends false
		? null
		: never
	after: After extends true
		? ReturnType<D['dataWithId']>
		: After extends false
		? null
		: never
}

export type BeforeCommitTriggerParams<D extends DocLike> = TriggerParams<D> &
	IntrinsicFields

//

//

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TriggerParams {
	export type After<D extends IDoc> = AfterTriggerParams<D>
	export type AfterCreate<D extends IDoc> = AfterTriggerParams<
		D,
		D,
		false,
		true
	>

	export type AfterDelete<D extends IDoc> = AfterTriggerParams<
		D,
		null,
		true,
		false
	>

	export type AfterCreateOrUpdate<D extends IDoc> = AfterTriggerParams<
		D,
		D,
		boolean,
		true
	>
	export type AfterUpdate<D extends IDoc> = AfterTriggerParams<D, D, true, true>

	export type OnGet<D extends IDoc> = TriggerParams<D>

	export type BeforeCommit<D extends IDoc> = TriggerParams<D>
}
