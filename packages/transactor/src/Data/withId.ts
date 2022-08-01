// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DataWithId } from './Data'
import type { Id } from './Id'

export function withId(data: null, id: Id): null
export function withId<D extends object, I extends Id>(
	data: D,
	id: I,
): DataWithId<Omit<D, 'id'>, I>
export function withId<D extends object | null, I extends Id>(
	data: D,
	id: I,
): D extends null ? null : DataWithId<Omit<D, 'id'>, I>

export function withId(data: object | null, id: Id) {
	if (data === null) return null

	return { ...data, id }
}
