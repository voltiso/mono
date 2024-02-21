// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge } from '@voltiso/util'
import { isPlainObject, omit } from '@voltiso/util'

import type { $$DocRelatedLike, GetData, GetDataWithId, GetId } from '~'
import type { PathMatches } from '~/common'
import type { IntrinsicFields, VoltisoEntry } from '~/schemas'

export type AggregateView<T extends VoltisoEntry.AggregateTarget.Entry> =
	T['value'] extends object ? Merge<T['value'], T> : T

export function getAggregateView<T extends VoltisoEntry.AggregateTarget.Entry>(
	data: T,
): AggregateView<T> {
	if (isPlainObject(data.value))
		return {
			...data.value,
			...data,
		}
	else return data
}

//

export type AggregatesView<T extends IntrinsicFields> = [
	{
		[k in keyof T['__voltiso']['aggregateTarget']]: AggregateView<
			T['__voltiso']['aggregateTarget'][k]
		>
	},
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
][0]

export function getAggregatesView<R extends $$DocRelatedLike>(
	data: GetDataWithId<R>,
): AggregatesView<GetData<R>> {
	return Object.fromEntries(
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		Object.entries((data as any).__voltiso.aggregateTarget).map(
			([key, value]) => [key, getAggregateView(value as never)],
		),
	) as never
}

//

export interface AggregatorHandlerThis<R extends $$DocRelatedLike>
	extends PathMatches {
	id: GetId<R>
	path: string
	data: GetData<R>
	dataWithId: GetDataWithId<R>
	aggregates: AggregatesView<this['data']>
	numRefs: this['data']['__voltiso']['numRefs']
}

export function getDocDataView<R extends $$DocRelatedLike>(
	dataWithId: GetDataWithId<R>,
	ctx: PathMatches & { path: string },
): AggregatorHandlerThis<R> {
	return {
		// ...data, // ! this causes bugs... you get object with many fields, were you might expect only data fields
		id: dataWithId.id as never,
		...ctx,
		data: omit(dataWithId, 'id') as never,
		dataWithId,
		aggregates: getAggregatesView(dataWithId) as never,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		numRefs: (dataWithId as any).__voltiso.numRefs as never,
	} as never
}
