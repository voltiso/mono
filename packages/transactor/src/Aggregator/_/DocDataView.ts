// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from '@voltiso/util'
import { isPlainObject, omit } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { DocTI, GetData } from '~/Doc'
import type { AggregateTargetEntry, IntrinsicFields } from '~/schemas'

export type AggregateView<T extends AggregateTargetEntry> =
	T['value'] extends object ? Merge2_<T['value'], T> : T

export function getAggregateView<T extends AggregateTargetEntry>(
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
][0]

export function getAggregatesView<T extends DocDataViewInput>(
	data: T,
): AggregatesView<T> {
	return Object.fromEntries(
		Object.entries(data.__voltiso.aggregateTarget).map(([key, value]) => [
			key,
			getAggregateView(value as never),
		]),
	) as never
}

//

export type DocDataView<T extends DocDataViewInput = DocDataViewInput> = {
	id: T['id']
	data: Omit<T, 'id'>
	dataWithId: T
	aggregates: AggregatesView<T>
	numRefs: T['__voltiso']['numRefs']
}

// export type DocDataView<T extends IntrinsicFields = IntrinsicFields> = Merge2_<
// 	T,
// 	{
// 		data: T
// 		aggregates: AggregatesView<T>
// 		numRefs: T['__voltiso']['numRefs']
// 	}
// >

export type DocDataViewInput = GetData<DocTI> & { id: DocIdString }

export function getDocDataView<T extends DocDataViewInput>(
	dataWithId: T,
): DocDataView<T> {
	return {
		// ...data, // ! this causes bugs... you get object with many fields, were you might expect only data fields
		id: dataWithId.id,
		data: omit(dataWithId, 'id') as Omit<T, 'id'>,
		dataWithId,
		aggregates: getAggregatesView(dataWithId),
		numRefs: dataWithId.__voltiso.numRefs,
	}
}
