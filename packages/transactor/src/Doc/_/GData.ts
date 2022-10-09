// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InputType, Type, Type_ } from '@voltiso/schemar.types'
import type { _, $_, HasIndexSignature, Merge2Reverse_ } from '@voltiso/util'

import type { Id, WithId } from '~/Data'
import type { DocLike, ExecutionContext, IDoc } from '~/Doc'
import type { VoltisoEntry } from '~/schemas/sIntrinsicFields'

/** @internal */
export type _GetAggregateTargetEntry<T> = [
	{
		value: T
		numSources: number
	},
][0]

/** @internal */
export type _$GetAggregateTarget<T extends object> = T extends any
	? HasIndexSignature<T> extends true
		? {
				// eslint-disable-next-line etc/no-internal
				[k in keyof T]: _GetAggregateTargetEntry<T[k]>
		  }
		: HasIndexSignature<T> extends false
		? {
				// eslint-disable-next-line etc/no-internal
				[k in keyof T]?: _GetAggregateTargetEntry<T[k]>
		  }
		: never
	: never

/** @inline */
export type GetData<
	TI extends {
		publicOnCreation?: any
		public?: any
		private?: any
		aggregates?: any
	},
> = $_<
	Type_<TI['publicOnCreation']> &
		Type_<TI['public']> &
		Type_<TI['private']> & {
			__voltiso: Merge2Reverse_<
				{
					// eslint-disable-next-line etc/no-internal
					aggregateTarget: _$GetAggregateTarget<Type_<TI['aggregates']>>
				},
				VoltisoEntry
			>
		}
>

/** @inline */
export type GetDataWithId<
	TI extends { publicOnCreation?: any; public?: any; private?: any },
	Doc extends DocLike = IDoc,
> = WithId<GetData<TI>, Doc>

//

/** @inline */
export type GetInputData<
	TI extends {
		publicOnCreation?: any
		public?: any
		private?: any
	},
> = $_<
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
	Doc extends DocLike = IDoc,
> = WithId<GetInputData<TI>, Doc>

//

/** @inline */
export type GetPublicData<TI extends { public?: any }> = Type<TI['public']>

// /** @inline */
// export type RelaxRefs<X> = X extends IRef
// 	? Relax<X>
// 	: X extends object
// 	? {
// 			[k in keyof X]: RelaxRefs<X[k]>
// 	  }
// 	: X

/** @inline */
export type GetPublicCreationInputData<
	TI extends { public?: any; publicOnCreation?: any },
	Doc extends DocLike = IDoc,
> = _<
	{
		id?: Id<Doc> | undefined
	} & InputType<TI['publicOnCreation']> &
		InputType<TI['public']>
>

/** @inline */
export type GetPublicInputData<TI extends { public?: any }> = InputType<
	TI['public']
>

//

/** @inline */
export type GetCreationDataByCtx<
	TI extends { publicOnCreation?: any; public?: any; private?: any },
	Ctx extends ExecutionContext,
	Doc extends DocLike = IDoc,
> = Ctx extends 'inside'
	? GetInputData<TI>
	: Ctx extends 'outside'
	? GetPublicCreationInputData<TI, Doc>
	: never

/** @inline */
export type GetUpdateDataByCtx<
	TI extends { publicOnCreation?: any; public?: any; private?: any },
	Ctx,
> = Ctx extends 'inside'
	? GetInputData<TI>
	: Ctx extends 'outside'
	? GetPublicInputData<TI>
	: never
