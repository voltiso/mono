// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRefBaseLike } from '~/DocRef'
import { isDocRef } from '~/DocRef'

export type JsonFromDocData<Data> = Data extends DocRefBaseLike
	? { id: string; path: string }
	: Data

export function jsonFromDocData<Data>(data: Data): JsonFromDocData<Data> {
	if (isDocRef(data))
		return {
			id: data.id,
			path: data.path,
		} as never

	return data as never
}
