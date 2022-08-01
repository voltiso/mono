// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getProperty } from '~/object'

// import { TsUtilError } from '~'
// import { toString } from '~'

type PickResult<O, K extends keyof O> = Required<Pick<O, K>>

// export function pick<O extends object, K extends keyof O>(
// 	obj: O,
// 	key: K
// ): PickResult<O, K>

// export function pick<O extends object, K extends keyof O>(
// 	obj: O,
// 	...keys: K[]
// ): PickResult<O, K>

export function pick<O extends object, K extends keyof O>(
	obj: O,
	...keys: K[]
): PickResult<O, K> {
	const r = {} as PickResult<O, K>

	for (const key of keys) {
		const value = getProperty(obj, key)
		// if (!Object.hasOwn(obj, key)) {
		// 	throw new TsUtilError(
		// 		`pick(${toString(obj)}, ${toString(keyOrKeys)}): key ${toString(
		// 			key
		// 		)} does not exist`
		// 	)
		// }

		// eslint-disable-next-line security/detect-object-injection
		r[key] = value
	}

	return r
}
