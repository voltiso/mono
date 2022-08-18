// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetInputType, GetType } from '@voltiso/schemar'
import type { _ } from '@voltiso/util'

import type { Id, WithId } from '~/Data'
import type { ExecutionContext, IDoc } from '~/Doc'
import type { IRef } from '~/Ref'
import type { Relax } from '~/Relax'
import type { IntrinsicFields } from '~/schemas/intrinsicFields'

/** @inline */
export type GetData<
	TI extends { publicOnCreation?: any; public?: any; private?: any },
> = _<
	GetType<TI['publicOnCreation']> &
		GetType<TI['public']> &
		GetType<TI['private']> &
		IntrinsicFields
>

/** @inline */
export type GetDataWithId<
	TI extends { publicOnCreation?: any; public?: any; private?: any },
	Doc extends IDoc = IDoc,
> = WithId<GetData<TI>, Doc>

//

/** @inline */
export type GetInputData<
	TI extends {
		publicOnCreation?: any
		public?: any
		private?: any
	},
> = _<
	GetInputType<TI['publicOnCreation']> &
		GetInputType<TI['public']> &
		GetInputType<TI['private']>
>

/** @inline */
export type GetInputDataWithId<
	TI extends {
		publicOnCreation?: any
		public?: any
		private?: any
	},
	Doc extends IDoc = IDoc,
> = WithId<GetInputData<TI>, Doc>

//

/** @inline */
export type GetPublicData<TI extends { public?: any }> = GetType<TI['public']>

/** @inline */
export type RelaxRefs<X> = X extends IRef
	? Relax<X>
	: X extends object
	? {
			[k in keyof X]: RelaxRefs<X[k]>
	  }
	: X

/** @inline */
export type GetPublicCreationInputData<
	TI extends { public?: any; publicOnCreation?: any },
	Doc extends IDoc = IDoc,
> = _<
	{ id?: Id<Doc> | undefined } & RelaxRefs<
		GetInputType<TI['publicOnCreation']>
	> &
		RelaxRefs<GetInputType<TI['public']>>
>

/** @inline */
export type GetPublicInputData<TI extends { public?: any }> = RelaxRefs<
	GetInputType<TI['public']>
>

//

/** @inline */
export type GetCreationDataByCtx<
	TI,
	Ctx extends ExecutionContext,
	Doc extends IDoc = IDoc,
> = Ctx extends 'inside'
	? GetInputData<TI>
	: Ctx extends 'outside'
	? GetPublicCreationInputData<TI, Doc>
	: never

/** @inline */
export type GetUpdateDataByCtx<TI, Ctx> = Ctx extends 'inside'
	? GetInputData<TI>
	: Ctx extends 'outside'
	? GetPublicInputData<TI>
	: never
