// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar'
import type { MaybeArray, MaybePromise } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { $$Doc, $$DocTI, GetDataWithId } from '~/Doc'
import type { $$DocRef } from '~/DocRef'
import type { $$DocRelatedLike, GetDocTI } from '~/DocRelated'

import type { DocDataView } from './DocDataView'

export interface IAggregatorHandlers {
	/** @deprecated Use `.default()` on a schema instead */
	initialValue?: unknown

	/**
	 * Should return a Doc, a DocRef, or an array of these
	 *
	 * ⚠️ Do not return a `Promise<DocRef>` to a non-existing document (but
	 * returning it as a single element array is ok)
	 */
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
	? Type_<GetDocTI<Target>['aggregates'][Name], { kind: Kind }>
	: never

//

export interface AggregatorHandlers<
	SourceTI extends $$DocTI,
	Target extends $$Doc,
	Name extends string,
> {
	/** @deprecated Use `.default()` on a schema instead */
	initialValue?: GetAggregate<Target, Name, 'out'> // out, not in - to mitigate bugs

	/**
	 * Should return a Doc, a DocRef, or an array of these
	 *
	 * ⚠️ Do not return a `Promise<DocRef>` to a non-existing document (but
	 * returning it as a single element array is ok)
	 */
	target(
		this: DocDataView<GetDataWithId<SourceTI>>,
	): MaybePromise<MaybeArray<{ id: DocIdString<Target> } | undefined>>

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
