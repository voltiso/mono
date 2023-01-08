// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertNotPolluting, isPlainObject } from '@voltiso/util'

export function deepCloneData<T>(data: T): T {
	if (isPlainObject(data)) {
		const result: Partial<T> = {}
		// let haveChange = false

		for (const [key, value] of Object.entries(data) as [keyof any, unknown][]) {
			assertNotPolluting(key)

			const newValue = deepCloneData(value)
			// if(newValue !== value) haveChange = true
			result[key as keyof typeof result] = newValue as never
		}

		return result as never
	} else if (Array.isArray(data))
		return data.map((value: unknown) => deepCloneData(value)) as never
	else return data
}
