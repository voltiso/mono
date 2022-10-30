// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

import type { $$Doc, GetDocTI } from '~/Doc'
import type { GetInputData } from '~/Doc/_/GData'
import type { DeleteIt } from '~/it'

import type {
	AfterTriggerParams,
	BeforeCommitTriggerParams,
	TriggerParams,
} from './TriggerParams'

export type TriggerReturn<D extends $$Doc> =
	| GetInputData<GetDocTI<D>>
	| DeleteIt
	| undefined
	| void

export type AfterTrigger<
	D extends $$Doc = $$Doc,
	BeforeExists extends boolean = boolean,
	AfterExists extends boolean = boolean,
	R = TriggerReturn<D>,
> = (
	this: AfterExists extends true ? D : AfterExists extends false ? null : never,
	params: AfterTriggerParams<D, BeforeExists, AfterExists>,
) => MaybePromise<R>

export type OnGetTrigger<
	D extends $$Doc = $$Doc,
	Exists extends boolean = boolean,
> = (
	this: Exists extends true ? D : Exists extends false ? null : never,
	params: TriggerParams<D, Exists>,
) => MaybePromise<TriggerReturn<D>>

export type UnknownTrigger = <D extends $$Doc>(
	this: D | null,
	params: TriggerParams<D>,
) => MaybePromise<TriggerReturn<D>>

export type BeforeCommitTrigger<D extends $$Doc = $$Doc> = (
	this: D | null,
	params: BeforeCommitTriggerParams<D>,
) => MaybePromise<TriggerReturn<D>>
