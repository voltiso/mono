// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '~/object'
// eslint-disable-next-line sonarjs/no-built-in-override
import { hasOwnProperty } from '~/object'
import type { AlsoAccept } from '~/type'

type PickIfPresentResult<O, K extends keyof O | AlsoAccept<keyof any>> = _<
	{
		[k in keyof O as k extends K ? k : never]: k extends keyof O ? O[k] : never
	} & {
		readonly [k in K]?: unknown
	}
>

// export function pickIfPresent<
// 	O extends object,
// 	K extends keyof O | AlsoAccept<keyof any>
// >(obj: O, key: K): PickIfPresentResult<O, K>

// export function pickIfPresent<
// 	O extends object,
// 	K extends keyof O | AlsoAccept<keyof any>
// >(obj: O, ...keys: K[]): PickIfPresentResult<O, K>

export function pickIfPresent<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
>(obj: O, ...keys: K[]): PickIfPresentResult<O, K> {
	const r = {} as PickIfPresentResult<O, K>

	for (const key of keys) {
		// if (!Object.hasOwn(obj, key)) {
		// 	throw new TsUtilError(
		// 		`pick(${toString(obj)}, ${toString(keyOrKeys)}): key ${toString(
		// 			key
		// 		)} does not exist`
		// 	)
		// }

		if (hasOwnProperty(obj, key)) r[key] = obj[key] as never
	}

	return r
}
