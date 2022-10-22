// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathMatches } from '~/common'
import type { Id } from '~/Data'
import type { Db } from '~/Db'
import type { DocLike, DTI, IDoc } from '~/Doc'
import type { DocRefContext } from '~/DocRef'
import type { DocPath } from '~/Path'
import type { IntrinsicFields, VoltisoEntry } from '~/schemas'

export declare const TRIGGER_PARAMS_TYPE_INFO: unique symbol

export interface TriggerParams<
	D extends DocLike = IDoc,
	ThisExists extends boolean = boolean,
> extends PathMatches,
		DocRefContext {
	doc: ThisExists extends true ? D : ThisExists extends false ? null : never

	__voltiso: VoltisoEntry

	path: DocPath<D[DTI]['tag']>
	id: Id<D>

	db: Db

	possiblyExists: boolean
}

// export type $AfterTriggerParams<
// 	D extends DocLike = IDoc,
// 	This extends D | null = D | null,
// 	Before extends boolean = boolean,
// 	After extends boolean = boolean,
// > = D extends any ? AfterTriggerParams<D, This, Before, After> : never

export interface AfterTriggerParams<
	D extends DocLike = IDoc,
	BeforeExists extends boolean = boolean,
	AfterExists extends boolean = boolean,
> extends TriggerParams<D, AfterExists> { // This === After
	// AfterTriggerParamsLike<D, This, Before, After>
	//

	before: BeforeExists extends true
		? any // GetDataWithId<D[DTI], D>
		: BeforeExists extends false
		? null
		: never

	after: AfterExists extends true
		? any // GetDataWithId<D[DTI], D>
		: AfterExists extends false
		? null
		: never
}

// export interface AfterTriggerParamsLike<
// 	D extends DocLike = IDoc,
// 	This = D | null,
// 	Before extends boolean = boolean,
// 	After extends boolean = boolean,
// > {
// 	/** Type-only (helps with TS typings) */
// 	readonly [TRIGGER_PARAMS_TYPE_INFO]?: {
// 		D: D
// 		This: This
// 		Before: Before
// 		After: After
// 	}
// }

export type BeforeCommitTriggerParams<D extends DocLike> = TriggerParams<D> &
	IntrinsicFields

//

//

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TriggerParams {
	export type After<D extends IDoc> = AfterTriggerParams<D>
	export type AfterCreate<D extends IDoc> = AfterTriggerParams<
		D,
		false,
		true
	>

	export type AfterDelete<D extends IDoc> = AfterTriggerParams<
		D,
		true,
		false
	>

	export type AfterCreateOrUpdate<D extends IDoc> = AfterTriggerParams<
		D,
		boolean,
		true
	>
	export type AfterUpdate<D extends IDoc> = AfterTriggerParams<D, true, true>

	export type OnGet<D extends IDoc> = TriggerParams<D>

	export type BeforeCommit<D extends IDoc> = TriggerParams<D>
}
