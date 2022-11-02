// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomObject, Input, Type } from '@voltiso/schemar.types'
import type {
	_,
	Callable,
	DeepReadonlyN,
	HasIndexSignature,
	Newable,
	OPTIONS,
	Primitive,
} from '@voltiso/util'

import type { DocIdBrand, DocIdString_ } from '~/brand'
import type { $WithId, DataRecord, TightenRefs, WithId } from '~/Data'
import type { $$Doc, $$DocTI, DocTI, DTI, ExecutionContext, IDoc } from '~/Doc'
import type { $$DocRelatedLike, GetDoc, GetDocTI } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

import type { GetIntrinsicFields } from './GetIntrinsicFields'

/** @internal */
export type _GetAggregateTargetEntry<T> = [
	{
		value: T
		numSources: number
	},
][0]

/** @internal */
export type _$GetAggregateTarget<T> = T extends any
	? HasIndexSignature<T> extends true
		? {
				// eslint-disable-next-line etc/no-internal
				[k in keyof T]: _GetAggregateTargetEntry<T[k]>
		  }
		: HasIndexSignature<T> extends false
		? {
				// eslint-disable-next-line etc/no-internal
				[k in keyof T]: _GetAggregateTargetEntry<T[k]> // ! Should be optional???
		  }
		: never
	: never

/** @inline */
export type GetData<R extends $$DocRelatedLike> = R extends any
	? GetData.ForDocTI<GetDocTI<R>>
	: never

export namespace GetData {
	export type ForDocTI<TI extends $$DocTI> = TI extends DocTI
		? _<
				GetIntrinsicFields.ForDocTI<TI> &
					TightenRefs<
						CustomObject.WithAnd<
							CustomObject.WithAnd<TI['publicOnCreation'], TI['public']>,
							TI['private']
						>['Output']
					>
		  >
		: never

	export type ForDoc<D extends $$Doc> = ForDocTI<GetDocTI.ByDoc<D>>
}

/** @inline */
export type GetDataWithId<R extends $$DocRelatedLike> = WithId<
	GetData<R>,
	GetDoc<R>
>

export namespace GetDataWithId {
	export type ForDoc<D extends $$Doc> = WithId<GetData.ForDoc<D>, D>

	export type ForDocTI<TI extends $$DocTI> = WithId<GetData.ForDocTI<TI>, TI>
}

//

/** @inline */
export type GetInputData<R extends $$DocRelatedLike> = GetInputData.ForDocTI<
	GetDocTI<R>
>

export namespace GetInputData {
	export type ForDocTI<TI extends $$DocTI> = [TI] extends [DocTI]
		? _<
				TI['publicOnCreation']['Input'] &
					TI['public']['Input'] &
					TI['private']['Input']
		  >
		: never

	export type ForDoc<D extends $$Doc> = [D] extends [{ [DTI]: $$DocTI }]
		? ForDocTI<D[DTI]>
		: never
}

//

/** @inline */
export type GetInputDataWithId<
	TI extends $$DocRelatedLike,
	Doc extends $$Doc = IDoc,
> = $WithId<GetInputData<TI>, Doc>

//

/** @inline */
export type GetPublicData<R extends $$DocRelatedLike> = Type<
	GetDocTI<R>['public']
>

// /** @inline */
// export type RelaxRefs<X> = X extends IRef
// 	? Relax<X>
// 	: X extends object
// 	? {
// 			[k in keyof X]: RelaxRefs<X[k]>
// 	  }
// 	: X

/** @inline */
export type GetPublicCreationInputData<R extends $$DocRelatedLike> =
	R extends AnyDoc
		? { id?: string & DocIdBrand } & DataRecord
		: DeepReadonlyN<
				// eslint-disable-next-line no-magic-numbers
				10,
				{
					readonly id?: DocIdString_<R> | undefined
				} & CustomObject.WithAnd<
					GetDocTI<R>['publicOnCreation'],
					GetDocTI<R>['public']
				>[OPTIONS]['Input'],
				{ skip: Primitive | Callable | Newable }
		  >

/** @inline */
export type GetPublicInputData<R extends $$DocRelatedLike> = R extends any
	? Input<GetDocTI<R>['public']>
	: never

//

/** @inline */
export type GetCreationDataByCtx<
	R extends $$DocRelatedLike,
	Ctx extends ExecutionContext,
> = Ctx extends 'inside'
	? GetInputData<R>
	: Ctx extends 'outside'
	? GetPublicCreationInputData<R>
	: never

/** @inline */
export type GetUpdateDataByCtx<
	R extends $$DocRelatedLike,
	Ctx,
> = Ctx extends 'inside'
	? GetInputData<R>
	: Ctx extends 'outside'
	? GetPublicInputData<R>
	: never
