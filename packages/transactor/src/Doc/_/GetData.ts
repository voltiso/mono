// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Input_, Output_, SchemarAnd_ } from '@voltiso/schemar'
import type {
	_,
	Callable,
	DeepReadonlyN,
	HasIndexSignature,
	Newable,
	Primitive,
} from '@voltiso/util'

import type { DocIdBrand, DocIdString, DocIdString_ } from '~/brand'
import type { $WithId, DataRecord, WithId } from '~/Data'
import type { $$Doc, $$DocTI, DocTI, DTI, ExecutionContext } from '~/Doc'
import type { $$DocRef } from '~/DocRef'
import type { $$DocRelatedLike, GetDoc, GetDocTI } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'
import type { VoltisoEntry } from '~/schemas'

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
export type GetData<R extends $$DocRelatedLike> = R extends AnyDoc
	? { readonly id?: never; __voltiso: VoltisoEntry; [k: string]: unknown }
	: GetData.ForDocTI<GetDocTI<R>>

export namespace GetData {
	export type ForDocTI<TI extends $$DocTI> = TI extends DocTI
		? _<
				// TightenRefs<
				SchemarAnd_<
					SchemarAnd_<TI['publicOnCreation'], TI['public']>,
					TI['private']
				>['Output'] &
					// >
					GetIntrinsicFields.ForDocTI<TI>
		  >
		: never

	export type ForDoc<D extends $$Doc> = ForDocTI<GetDocTI.ByDoc<D>>
}

/** @inline */
export type GetDataWithId<R extends $$DocRelatedLike> = R extends AnyDoc
	? { readonly id: DocIdString<R>; [k: string]: unknown }
	: WithId<GetData<R>, GetDoc<R>>

export namespace GetDataWithId {
	export type ForDoc<D extends $$Doc> = WithId<GetData.ForDoc<D>, D>

	export type ForDocTI<TI extends $$DocTI> = WithId<GetData.ForDocTI<TI>, TI>
}

//

/** @inline */
export type GetInputData<R extends $$DocRelatedLike> = R extends AnyDoc
	? { readonly id?: never; [k: string]: unknown }
	: GetInputData.ForDocTI<GetDocTI<R>>

export namespace GetInputData {
	export type ForDocTI<TI extends $$DocTI> = TI extends DocTI
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
	Doc extends $$DocRelatedLike = AnyDoc,
> = $WithId<GetInputData<TI>, Doc>

//

/** @inline */
export type GetPublicData<R extends $$DocRelatedLike> = Output_<
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
				} & SchemarAnd_<
					GetDocTI<R>['publicOnCreation'],
					GetDocTI<R>['public']
				>['Input'],
				{ skip: Primitive | Callable | Newable | Date | $$DocRef }
		  >

// type A = _<GetPublicCreationInputData<'oops'>>

/** @inline */
export type GetPublicInputData<R extends $$DocRelatedLike> = R extends AnyDoc
	? { readonly id?: never; [k: string]: unknown }
	: Input_<GetDocTI<R>['public']>

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
