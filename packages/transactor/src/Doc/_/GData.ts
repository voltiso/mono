// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomObject,
	InputType,
	OPTIONS,
	Type,
} from '@voltiso/schemar.types'
import type {
	$_,
	Callable,
	DeepReadonlyN,
	HasIndexSignature,
	Newable,
	Primitive,
} from '@voltiso/util'

import type { $WithId, Id, WithId } from '~/Data'
import type { DocLike, DocTILike, ExecutionContext, IDoc } from '~/Doc'

import type { GetIntrinsicFields } from './GetIntrinsicFields'

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
export type GetData<TI extends DocTILike> = TI extends any
	? $_<
			GetIntrinsicFields<TI> &
				CustomObject.WithAnd<
					CustomObject.WithAnd<TI['publicOnCreation'], TI['public']>,
					TI['private']
				>['OutputType']
	  >
	: never

// type A = JsonFromDocData<GetData<DocTILike>>

// Assert.is<GetData<DocTILike>, { __voltiso: any }>()

/** @inline */
export type GetDataWithId<
	TI extends DocTILike,
	Doc extends DocLike = IDoc,
> = Doc extends any ? WithId<GetData<TI>, Doc> : never

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
> = $WithId<GetInputData<TI>, Doc>

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
> = DeepReadonlyN<
	// eslint-disable-next-line no-magic-numbers
	10,
	{
		readonly id?: Id<Doc> | undefined
	} & CustomObject.WithAnd<
		TI['publicOnCreation'],
		TI['public']
	>[OPTIONS]['Input'],
	{ skip: Primitive | Callable | Newable }
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
