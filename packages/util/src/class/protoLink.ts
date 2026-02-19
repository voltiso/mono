// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '_/error'

import type { Reverse } from '~/array'
import type { MergeN } from '~/object'
import { stringFrom } from '~/string'

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

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		Object.setPrototypeOf(args[index], args[index + 1]!)
	}

	return args[0] as never
}
