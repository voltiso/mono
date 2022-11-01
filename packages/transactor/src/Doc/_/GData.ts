// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomObject, Input, Type } from '@voltiso/schemar.types'
import type {
	$_,
	Callable,
	DeepReadonlyN,
	HasIndexSignature,
	Newable,
	OPTIONS,
	Primitive,
} from '@voltiso/util'

import type { $WithId, DocIdString, WithId } from '~/Data'
import type {
	$$Doc,
	$$DocRelated,
	ExecutionContext,
	GetDoc,
	GetDocTI,
	IDoc,
} from '~/Doc'

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
export type GetData<R extends $$DocRelated> = R extends any
	? $_<
			GetIntrinsicFields<R> &
				CustomObject.WithAnd<
					CustomObject.WithAnd<
						GetDocTI<R>['publicOnCreation'],
						GetDocTI<R>['public']
					>,
					GetDocTI<R>['private']
				>['Output']
	  >
	: never

/** @inline */
export type GetDataWithId<R extends $$DocRelated> = WithId<
	GetData<R>,
	GetDoc<R>
>

//

/** @inline */
export type GetInputData<R extends $$DocRelated> = R extends any
	? $_<
			Input<GetDocTI<R>['publicOnCreation']> &
				Input<GetDocTI<R>['public']> &
				Input<GetDocTI<R>['private']>
	  >
	: never

/** @inline */
export type GetInputDataWithId<
	TI extends $$DocRelated,
	Doc extends $$Doc = IDoc,
> = $WithId<GetInputData<TI>, Doc>

//

/** @inline */
export type GetPublicData<R extends $$DocRelated> = Type<GetDocTI<R>['public']>

// /** @inline */
// export type RelaxRefs<X> = X extends IRef
// 	? Relax<X>
// 	: X extends object
// 	? {
// 			[k in keyof X]: RelaxRefs<X[k]>
// 	  }
// 	: X

/** @inline */
export type GetPublicCreationInputData<R extends $$DocRelated> = R extends any
	? DeepReadonlyN<
			// eslint-disable-next-line no-magic-numbers
			10,
			{
				readonly id?: DocIdString<R> | undefined
			} & CustomObject.WithAnd<
				GetDocTI<R>['publicOnCreation'],
				GetDocTI<R>['public']
			>[OPTIONS]['Input'],
			{ skip: Primitive | Callable | Newable }
	  >
	: never

/** @inline */
export type GetPublicInputData<R extends $$DocRelated> = R extends any
	? Input<GetDocTI<R>['public']>
	: never

//

/** @inline */
export type GetCreationDataByCtx<
	R extends $$DocRelated,
	Ctx extends ExecutionContext,
> = Ctx extends 'inside'
	? GetInputData<R>
	: Ctx extends 'outside'
	? GetPublicCreationInputData<R>
	: never

/** @inline */
export type GetUpdateDataByCtx<
	R extends $$DocRelated,
	Ctx,
> = Ctx extends 'inside'
	? GetInputData<R>
	: Ctx extends 'outside'
	? GetPublicInputData<R>
	: never
