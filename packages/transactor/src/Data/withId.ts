// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetDocTag, IDoc } from '~/Doc'

import type { $WithId } from './Data'
import type { Id } from './Id'

export function withId(data: null, id: Id): null

export function withId<Data extends object, TDoc extends IDoc>(
	data: Data,
	id: Id<GetDocTag<TDoc>>,
): $WithId<Omit<Data, 'id'>, TDoc>

export function withId<Data extends object | null, TDoc extends IDoc>(
	data: Data,
	id: Id<GetDocTag<TDoc>>,
): Data extends null ? null : $WithId<Omit<Data, 'id'>, TDoc>

//

export function withId(data: object | null, id: Id) {
	if (data === null) return null
	return { ...data, id }
}
