// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant, DeleteIt, If, MaybePromise } from '@voltiso/util'

import type { $$Doc, GetInputData } from '~/Doc'

import type { AfterTriggerParams, TriggerParams } from './TriggerParams'

/** If things are too deep, use {@link TriggerReturnLike} instead */
export type TriggerReturn<D extends $$Doc> =
	// | object // 🤷 not too deep
	// | DataRecord // 🤷 not too deep
	| GetInputData.ForDoc<D> // ! too deep?
	| DeleteIt
	| undefined
	| void

export type AfterTrigger<
	D extends $$Doc = $$Doc,
	BeforeExists extends boolean = boolean,
	AfterExists extends boolean = boolean,
	Return = TriggerReturn<D>,
> = Bivariant<
	(
		this: If<AfterExists, D, null>,
		params: AfterTriggerParams<D, BeforeExists, AfterExists>,
	) => MaybePromise<Return>
>

//

export type OnGetTrigger<
	D extends $$Doc = $$Doc,
	Exists extends boolean = boolean,
> = {
	bivarianceHack(
		this: Exists extends true ? D : Exists extends false ? null : never,
		params: TriggerParams<D, Exists>,
	): MaybePromise<TriggerReturn<D>>
}['bivarianceHack']

export type Trigger = {
	bivarianceHack: <D extends $$Doc>(
		this: D | null,
		params: TriggerParams<D>,
	) => MaybePromise<TriggerReturn<D>>
}['bivarianceHack']

//

export namespace Trigger {
	export type After<D extends $$Doc = $$Doc> = AfterTrigger<D>
	export type AfterUpdate<D extends $$Doc = $$Doc> = AfterTrigger<D, true, true>

	export type AfterCreateOrUpdate<D extends $$Doc = $$Doc> = AfterTrigger<
		D,
		boolean,
		true
	>

	export type AfterCreate<D extends $$Doc = $$Doc> = AfterTrigger<
		D,
		false,
		true
	>
	export type AfterDelete<D extends $$Doc = $$Doc> = AfterTrigger<
		D,
		true,
		false
	>

	export type BeforeCommit<D extends $$Doc = any> = {
		bivarianceHack(
			this: D | null,
			params: TriggerParams.BeforeCommit<D>,
		): MaybePromise<TriggerReturn<D>>
	}['bivarianceHack']
}
