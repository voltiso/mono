// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from '~/Doc'

import type { WithId } from './Data'
import type { Id } from './Id'

export function withId(data: null, id: Id): null

export function withId<Data extends object, Doc extends IDoc>(
	data: Data,
	id: Id<Doc>,
): WithId<Omit<Data, 'id'>, Doc>

export function withId<Data extends object | null, Doc extends IDoc>(
	data: Data,
	id: Id<Doc>,
): Data extends null ? null : WithId<Omit<Data, 'id'>, Doc>

//

export function withId(data: object | null, id: Id) {
	if (data === null) return null

	return { ...data, id }
}
