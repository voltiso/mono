// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable security/detect-object-injection */

import type { AlsoAccept } from '../../../type/AlsoAccept.js'
import type { _ } from '../../flatten'
import { hasOwnProperty } from '../../get-set'

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
