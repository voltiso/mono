// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { If } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { PathMatches } from '~/common'
import type { Db } from '~/Db'
import type {
	$$Doc,
	GetDataWithId,
	GetIntrinsicFields,
	GetVoltisoEntry,
} from '~/Doc'
import type { DocRefContext } from '~/DocRef'
import type { CustomDocPath } from '~/Path'

export declare const TRIGGER_PARAMS_TYPE_INFO: unique symbol

// type AA = GetDocTag<Doc>
// type A = CustomDocPath<AA>

export interface TriggerParams<
	D extends $$Doc = $$Doc,
	ThisExists extends boolean = boolean,
> extends PathMatches,
		DocRefContext<D> {
	//
	doc: If<ThisExists, D, null>

	__voltiso: GetVoltisoEntry<D>

	path: CustomDocPath<{ doc: D }>
	id: DocIdString<D>

	db: Db

	possiblyExists: boolean
}

export interface AfterTriggerParams<
	D extends $$Doc = $$Doc,
	BeforeExists extends boolean = boolean,
	AfterExists extends boolean = boolean,
> extends TriggerParams<D, AfterExists> {
	before: If<BeforeExists, GetDataWithId.ForDoc<D>, null>
	after: If<AfterExists, GetDataWithId.ForDoc<D>, null>
}

//

//

export namespace TriggerParams {
	export type After<D extends $$Doc> = AfterTriggerParams<D>
	export type AfterCreate<D extends $$Doc> = AfterTriggerParams<D, false, true>
	export type AfterUpdate<D extends $$Doc> = AfterTriggerParams<D, true, true>
	export type AfterDelete<D extends $$Doc> = AfterTriggerParams<D, true, false>

	export type AfterCreateOrUpdate<D extends $$Doc> = AfterTriggerParams<
		D,
		boolean,
		true
	>
	export type OnGet<D extends $$Doc> = TriggerParams<D>

	export interface BeforeCommit<D extends $$Doc>
		extends TriggerParams<D>,
			GetIntrinsicFields<D> {}
}
