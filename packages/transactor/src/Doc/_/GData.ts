// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InputType, Type, Type_ } from '@voltiso/schemar'
import type { _, $_ } from '@voltiso/util'

import type { Id, WithId } from '~/Data'
import type { ExecutionContext, IDoc } from '~/Doc'
import type { IRef } from '~/Ref'
import type { Relax } from '~/Relax'
import type { PartialIntrinsicFields } from '~/schemas/sIntrinsicFields'

/** @inline */
export type GetData<
	TI extends { publicOnCreation?: any; public?: any; private?: any },
> = $_<
	Type_<TI['publicOnCreation']> &
		Type_<TI['public']> &
		Type_<TI['private']> &
		PartialIntrinsicFields
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
	InputType<TI['publicOnCreation']> &
		InputType<TI['public']> &
		InputType<TI['private']>
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
export type GetPublicData<TI extends { public?: any }> = Type<TI['public']>

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
	{ id?: Id<Doc> | undefined } & RelaxRefs<InputType<TI['publicOnCreation']>> &
		RelaxRefs<InputType<TI['public']>>
>

/** @inline */
export type GetPublicInputData<TI extends { public?: any }> = RelaxRefs<
	InputType<TI['public']>
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
