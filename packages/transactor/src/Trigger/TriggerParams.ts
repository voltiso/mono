// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

/* eslint-disable es-x/no-global-this */

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

declare global {
	namespace Voltiso {
		namespace Transactor {
			const TRIGGER_PARAMS_TYPE_INFO: unique symbol
			type TRIGGER_PARAMS_TYPE_INFO = typeof TRIGGER_PARAMS_TYPE_INFO
			// type TRIGGER_PARAMS_TYPE_INFO = { readonly _: unique symbol }['_']
			// const TRIGGER_PARAMS_TYPE_INFO: TRIGGER_PARAMS_TYPE_INFO
		}
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
Voltiso.Transactor ??= /* @__PURE__ */ {} as never
;(Voltiso.Transactor.TRIGGER_PARAMS_TYPE_INFO as any) ??=
	/* @__PURE__ */ Symbol.for('@voltiso/transactor/TRIGGER_PARAMS_TYPE_INFO')
export type TRIGGER_PARAMS_TYPE_INFO =
	Voltiso.Transactor.TRIGGER_PARAMS_TYPE_INFO
export const TRIGGER_PARAMS_TYPE_INFO: TRIGGER_PARAMS_TYPE_INFO =
	/* @__PURE__ */ Voltiso.Transactor.TRIGGER_PARAMS_TYPE_INFO

// type AA = GetDocTag<Doc>
// type A = CustomDocPath<AA>

export interface TriggerParams<
	D extends $$Doc = $$Doc,
	ThisExists extends boolean = boolean,
>
	extends PathMatches, DocRefContext {
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

	export interface BeforeCommit<D extends $$Doc = $$Doc>
		extends TriggerParams<D>, GetIntrinsicFields<D> {}
}
