// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocIdString } from '~/brand'
import type { $$Doc } from '~/Doc'

import type { $WithId } from './Data'

export function withId(data: null, id: DocIdString): null

export function withId<Data extends object, TDoc extends $$Doc>(
	data: Data,
	id: DocIdString<TDoc>,
): $WithId<Omit<Data, 'id'>, TDoc>

export function withId<Data extends object | null, TDoc extends $$Doc>(
	data: Data,
	id: DocIdString<TDoc>,
): Data extends null ? null : $WithId<Omit<Data, 'id'>, TDoc>

//

export function withId(data: object | null, id: DocIdString): any {
	if (data === null) return null
	return { ...data, id }
}
