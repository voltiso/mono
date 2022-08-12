// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetInputType, GetType } from '@voltiso/schemar'
import type { _ } from '@voltiso/util'

import type { Id } from '~/Data'
import type { IDoc } from '~/Doc'
import type { IRef } from '~/Ref'
import type { Relax } from '~/Relax'
import type { IntrinsicFields } from '~/schemas/intrinsicFields'

export type GetData<
	TI extends { publicOnCreation: any; public: any; private: any },
> = _<
	GetType<TI['publicOnCreation']> &
		GetType<TI['public']> &
		GetType<TI['private']> &
		IntrinsicFields
>

export type GetInputData<TI> = TI extends {
	publicOnCreation: any
	public: any
	private: any
}
	? GetInputType<TI['publicOnCreation']> &
			GetInputType<TI['public']> &
			GetInputType<TI['private']>
	: never

export type GetPublicData<TI extends { public: any }> = TI extends any
	? GetType<TI['public']>
	: never

export type RelaxRefs<X> = X extends IRef
	? Relax<X>
	: X extends object
	? {
			[k in keyof X]: RelaxRefs<X[k]>
	  }
	: X

export type GetPublicCreationInputData<TI, Doc extends IDoc> = TI extends {
	public: any
	publicOnCreation: any
}
	? _<
			{ id?: Id<Doc> | undefined } & RelaxRefs<
				GetInputType<TI['publicOnCreation']>
			> &
				RelaxRefs<GetInputType<TI['public']>>
	  >
	: never

export type GetPublicInputData<TI> = TI extends { public: any }
	? RelaxRefs<GetInputType<TI['public']>>
	: never

//

export type GetCreationDataByCtx<
	TI,
	Ctx,
	Doc extends IDoc,
> = Ctx extends 'inside'
	? GetInputData<TI>
	: Ctx extends 'outside'
	? GetPublicCreationInputData<TI, Doc>
	: never

export type GetUpdateDataByCtx<TI, Ctx> = Ctx extends 'inside'
	? GetInputData<TI>
	: Ctx extends 'outside'
	? GetPublicInputData<TI>
	: never
