// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertNotPolluting } from '~/object/get-set/isPolluting'
import type { AlsoAccept } from '~/type'

import type { OmitSimple } from './OmitSimple'

// export function omitIfPresent<
// 	O extends object,
// 	K extends keyof O | AlsoAccept<keyof any>
// >(obj: O, key: K): VOmit<O, K>

// export function omitIfPresent<
// 	O extends object,
// 	K extends keyof O | AlsoAccept<keyof any>
// >(obj: O, ...keys: K[]): VOmit<O, K>

export function omitIfPresent<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
>(obj: O, ...keys: K[]): OmitSimple<O, K> {
	const { ...r } = obj

	for (const key of keys) {
		assertNotPolluting(key)
		delete r[key as unknown as keyof O]
	}

	return r as unknown as OmitSimple<O, K>
}
