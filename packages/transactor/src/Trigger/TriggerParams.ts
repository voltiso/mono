// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathMatches } from '~/common'
import type { DocIdString } from '~/Data'
import type { Db } from '~/Db'
import type {
	$$Doc,
	$$DocRelated,
	GetDataWithId,
	GetIntrinsicFields,
	GetVoltisoEntry,
} from '~/Doc'
import type { DocRefContext } from '~/DocRef'
import type { CustomDocPath } from '~/Path'

import type { AnyDocTag } from '..'

export declare const TRIGGER_PARAMS_TYPE_INFO: unique symbol

// type AA = GetDocTag<Doc>
// type A = CustomDocPath<AA>

export interface TriggerParams<
	D extends $$DocRelated = AnyDocTag,
	ThisExists extends boolean = boolean,
> extends PathMatches,
		DocRefContext<D> {
	//
	doc: ThisExists extends true ? D : ThisExists extends false ? null : never

	__voltiso: GetVoltisoEntry<D>

	path: CustomDocPath<{ doc: D }>
	id: DocIdString<D>

	db: Db

	possiblyExists: boolean
}

// $dev(<D extends $$Doc>() => {
// 	$Assert.is<TriggerParams<D>, TriggerParams>()
// })

// export type $AfterTriggerParams<
// 	D extends DocLike = IDoc,
// 	This extends D | null = D | null,
// 	Before extends boolean = boolean,
// 	After extends boolean = boolean,
// > = D extends any ? AfterTriggerParams<D, This, Before, After> : never

export interface AfterTriggerParams<
	D extends $$DocRelated = AnyDocTag,
	BeforeExists extends boolean = boolean,
	AfterExists extends boolean = boolean,
> extends TriggerParams<D, AfterExists> {
	// This === After
	// AfterTriggerParamsLike<D, This, Before, After>
	//

	before: BeforeExists extends true
		? GetDataWithId<D>
		: BeforeExists extends false
		? null
		: never

	after: AfterExists extends true
		? GetDataWithId<D>
		: AfterExists extends false
		? null
		: never
}

// $dev(<D extends $$Doc>() => {
// 	$Assert.is<AfterTriggerParams<D>, AfterTriggerParams>()
// })

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

export type BeforeCommitTriggerParams<D extends $$Doc> = TriggerParams<D> &
	GetIntrinsicFields<D>

//

//

export namespace TriggerParams {
	export type After<D extends $$Doc> = AfterTriggerParams<D>
	export type AfterCreate<D extends $$Doc> = AfterTriggerParams<D, false, true>

	export type AfterDelete<D extends $$Doc> = AfterTriggerParams<D, true, false>

	export type AfterCreateOrUpdate<D extends $$Doc> = AfterTriggerParams<
		D,
		boolean,
		true
	>
	export type AfterUpdate<D extends $$Doc> = AfterTriggerParams<D, true, true>

	export type OnGet<D extends $$Doc> = TriggerParams<D>

	export type BeforeCommit<D extends $$Doc> = TriggerParams<D>
}
