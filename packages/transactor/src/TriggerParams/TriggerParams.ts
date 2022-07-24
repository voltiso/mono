// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from '../Doc'
import type {
	AfterTriggerParams,
	TriggerParams,
} from '../Trigger/TriggerParams'

export type After<D extends IDoc> = AfterTriggerParams<D>
export type AfterCreate<D extends IDoc> = AfterTriggerParams<D, D, false, true>
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
