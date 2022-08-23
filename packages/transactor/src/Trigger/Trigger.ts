// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

import type { Doc, DocLike, DocTI, DTI } from '~/Doc'
import type { GetInputData } from '~/Doc/_/GData'
import type { DeleteIt } from '~/it'

import type {
	AfterTriggerParams,
	BeforeCommitTriggerParams,
	TriggerParams,
} from './TriggerParams'

export type TriggerReturn<D extends DocLike> =
	| GetInputData<D[DTI]>
	| DeleteIt
	| undefined
	| void

export type AfterTrigger<
	D extends DocLike = Doc<DocTI, 'inside'>,
	This = D | null,
	Before extends boolean = boolean,
	After extends boolean = boolean,
	R = TriggerReturn<D>,
	Params = AfterTriggerParams<D, This, Before, After>,
> = (this: This, params: Params) => MaybePromise<R>

export type OnGetTrigger<
	D extends DocLike = Doc<DocTI, 'inside'>,
	This = D | null,
	R = TriggerReturn<D>,
> = (this: This, params: TriggerParams<D, This>) => MaybePromise<R>

export type UnknownTrigger = <D extends DocLike>(
	this: D | null,
	params: TriggerParams<D>,
) => MaybePromise<TriggerReturn<D>>

export type BeforeCommitTrigger<D extends DocLike = Doc<DocTI, 'inside'>> = (
	this: D | null,
	params: BeforeCommitTriggerParams<D>,
) => MaybePromise<TriggerReturn<D>>
