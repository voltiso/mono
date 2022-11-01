// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant, DeleteIt, MaybePromise } from '@voltiso/util'

import type { $$Doc, $$DocRelated, Doc } from '~/Doc'
import type { GetInputData } from '~/Doc/_/GData'

import type { AnyDocTag } from '..'
import type {
	AfterTriggerParams,
	BeforeCommitTriggerParams,
	TriggerParams,
} from './TriggerParams'

export type TriggerReturn<D extends $$DocRelated> =
	| GetInputData<D>
	| DeleteIt
	| undefined
	| void

export type AfterTrigger<
	D extends $$DocRelated = AnyDocTag,
	BeforeExists extends boolean = boolean,
	AfterExists extends boolean = boolean,
	Return = TriggerReturn<D>,
> = Bivariant<
	(
		this: AfterExists extends true
			? D
			: AfterExists extends false
			? null
			: never,
		params: AfterTriggerParams<D, BeforeExists, AfterExists>,
	) => MaybePromise<Return>
>

export type OnGetTrigger<
	D extends $$DocRelated = AnyDocTag,
	Exists extends boolean = boolean,
> = Bivariant<
	(
		this: Exists extends true ? D : Exists extends false ? null : never,
		params: TriggerParams<D, Exists>,
	) => MaybePromise<TriggerReturn<D>>
>

export type Trigger = {
	bivarianceHack: <D extends $$Doc>(
		this: D | null,
		params: TriggerParams<D>,
	) => MaybePromise<TriggerReturn<D>>
}['bivarianceHack']

// export type UnknownAfterTrigger = {
// 	bivarianceHack: <D extends $$Doc>(
// 		this: D | null,
// 		params: AfterTriggerParams<D>,
// 	) => MaybePromise<TriggerReturn<D>>
// }['bivarianceHack']

export type BeforeCommitTrigger<D extends $$Doc = Doc> = Bivariant<
	(
		this: D | null,
		params: BeforeCommitTriggerParams<D>,
	) => MaybePromise<TriggerReturn<D>>
>
