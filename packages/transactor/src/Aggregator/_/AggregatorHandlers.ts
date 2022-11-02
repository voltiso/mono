// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'
import type { MaybePromise } from '@voltiso/util'

import type { TightenRefs } from '~/Data'
import type { $$Doc, $$DocTI, GetDataWithId } from '~/Doc'
import type { $$DocRef, GetDocRef } from '~/DocRef'
import type {
	$$DocRelatedLike,
	GetDoc,
	GetDocTag,
	GetDocTI,
} from '~/DocRelated'

import type { DocDataView } from './DocDataView'

export interface IAggregatorHandlers {
	initialValue?: unknown

	// ! just use `.target()` instead
	// filter?(this: object): boolean | PromiseLike<boolean>

	target(
		this: object,
	):
		| MaybePromise<($$Doc | $$DocRef | void)[]>
		| MaybePromise<$$Doc | void>
		| $$DocRef

	autoCreateTarget?: boolean | undefined

	include(this: object, acc: unknown): MaybePromise<unknown>
	exclude(this: object, acc: unknown): MaybePromise<unknown>
}

export type GetAggregate<
	Target extends $$DocRelatedLike,
	Name,
	Kind extends 'out' | 'in',
> = Name extends keyof GetDocTI<Target>['aggregates']
	? TightenRefs<Type_<GetDocTI<Target>['aggregates'][Name], { kind: Kind }>>
	: never

//

export interface AggregatorHandlers<
	SourceTI extends $$DocTI,
	Target extends $$Doc,
	Name extends string,
> {
	initialValue?: GetAggregate<Target, Name, 'out'> // out, not in - to mitigate bugs

	// ! just use `.target()` instead
	// filter?(this: GetDoc<SourceTI>): MaybePromise<boolean>

	target(
		this: DocDataView<GetDataWithId<SourceTI>>,
	):
		| MaybePromise<
				(GetDoc<Target> | GetDocRef<{ doc: GetDocTag<Target> }> | undefined)[]
		  >
		| MaybePromise<GetDoc<Target>>
		| GetDocRef<{ doc: GetDocTag<Target> }>
		| undefined

	autoCreateTarget?: boolean | undefined

	include(
		this: DocDataView<GetDataWithId<SourceTI>>,
		acc: GetAggregate<Target, Name, 'out'>, // | InitialValue
	): MaybePromise<GetAggregate<Target, Name, 'out'>> // out, not in - to mitigate bugs

	exclude(
		this: DocDataView<GetDataWithId<SourceTI>>,
		acc: GetAggregate<Target, Name, 'out'>,
	): MaybePromise<GetAggregate<Target, Name, 'out'>> // out, not in - to mitigate bugs
}
