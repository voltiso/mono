// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

import type { Doc, DocLike, DocTI, DTI, IDoc } from '~/Doc'
import type { GetInputData } from '~/Doc/_/GData'
import type { DeleteIt } from '~/it'

import type {
	AfterTriggerParams,
	BeforeCommitTriggerParams,
	TriggerParams,
} from './TriggerParams'

type Return<D extends DocLike> = GetInputData<D[DTI]> | DeleteIt | undefined | void

export type AfterTrigger<
	D extends DocLike = Doc<DocTI, 'inside'>,
	This = D | null,
	Before extends boolean = boolean,
	After extends boolean = boolean,
	R = Return<D>,
	Params = AfterTriggerParams<D, This, Before, After>,
> = (this: This, params: Params) => MaybePromise<R>

export type OnGetTrigger<
	D extends DocLike = Doc<DocTI, 'inside'>,
	This = D | null,
	R = Return<D>,
> = (this: This, params: TriggerParams<D, This>) => MaybePromise<R>

export type UnknownTrigger = <D extends IDoc>(
	this: D | null,
	params: TriggerParams<D>,
) => MaybePromise<Return<D>>

export type BeforeCommitTrigger<D extends DocLike = Doc<DocTI, 'inside'>> = (
	this: D | null,
	params: BeforeCommitTriggerParams<D>,
) => MaybePromise<Return<D>>
