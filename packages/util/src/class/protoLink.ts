// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Reverse } from '~/array'
import { VoltisoUtilError } from '_/error/index'
import type { MergeN } from '~/object'
import { stringFrom } from '~/string'

/* eslint-disable security/detect-object-injection */

export function protoLink<Args extends object[]>(
	...args: Args
): MergeN<Reverse<Args>> {
	const last = args.length - 1
	const beforeLast = last - 1

	for (let index = beforeLast; index >= 0; --index) {
		const oldProto = Object.getPrototypeOf(args[index]) as object

		if (!(oldProto === Object.prototype || oldProto === Function.prototype))
			throw new VoltisoUtilError(
				`protoLink(...${stringFrom(args)}) assertion failed`,
			)

		Object.setPrototypeOf(args[index], args[index + 1] as object)
	}

	return args[0] as never
}
