// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'
import type { MaybePromise } from '@voltiso/util'

import type { $$Doc, GetDataWithId } from '~/Doc'
import type { $$DocRef, GetDocRef } from '~/DocRef'
import type {
	$$DocRelatedLike,
	GetDoc,
	GetDocTag,
	GetDocTI,
} from '~/DocRelated'

export interface IAggregatorHandlers {
	initialValue?: unknown

	filter?(this: object): boolean | PromiseLike<boolean>

	target(
		this: object,
	): MaybePromise<($$Doc | $$DocRef)[]> | MaybePromise<$$Doc> | $$DocRef

	autoCreateTarget?: boolean | undefined

	include(this: object, acc: unknown): MaybePromise<unknown>
	exclude(this: object, acc: unknown): MaybePromise<unknown>
}

export type GetAggregate<
	Target extends $$DocRelatedLike,
	Name,
	Kind extends 'out' | 'in',
> = _GetAggregate<Target, Name, Kind>

export type _GetAggregate<
	Target extends $$DocRelatedLike,
	Name,
	Kind extends 'out' | 'in',
> = Name extends keyof GetDocTI<Target>['aggregates']
	? Type_<GetDocTI<Target>['aggregates'][Name], { kind: Kind }>
	: never

//

export interface AggregatorHandlers<
	Source extends $$DocRelatedLike,
	Target extends $$DocRelatedLike,
	Name extends string,
> {
	initialValue?: GetAggregate<Target, Name, 'out'> // out, not in - to mitigate bugs

	filter?(this: GetDataWithId<Source>): MaybePromise<boolean>

	target(
		this: GetDataWithId<Source>,
	):
		| MaybePromise<(GetDoc<Target> | GetDocRef<{ doc: GetDocTag<Target> }>)[]>
		| MaybePromise<GetDoc<Target>>
		| GetDocRef<{ doc: GetDocTag<Target> }>

	autoCreateTarget?: boolean | undefined

	include(
		this: GetDataWithId<Source>,
		acc: GetAggregate<Target, Name, 'out'>, // | InitialValue
	): MaybePromise<GetAggregate<Target, Name, 'out'>> // out, not in - to mitigate bugs

	exclude(
		this: GetDataWithId<Source>,
		acc: GetAggregate<Target, Name, 'out'>,
	): MaybePromise<GetAggregate<Target, Name, 'out'>> // out, not in - to mitigate bugs
}
