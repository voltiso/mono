// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assumeType } from '../cast'
import { VoltisoUtilError } from '../error'
import type { UnknownProperty } from '../object'
import { hasProperty } from '../object'
import { toString } from '../string'

type MethodKey<O> = string &
	{
		[k in keyof O]: O[k] extends (this: O, ...args: never[]) => unknown
			? k
			: never
	}[keyof O]

export function final<
	Base extends object,
	Keys extends (keyof Base | UnknownProperty)[],
>(
	thisArg: Record<MethodKey<Base>, unknown>,
	Base: {
		name: string
		prototype: Base
	},
	...keys: Keys
): void {
	for (const m of keys) {
		if (
			!hasProperty(Base.prototype, m) ||
			// eslint-disable-next-line security/detect-object-injection
			typeof Base.prototype[m] !== 'function'
		) {
			throw new VoltisoUtilError(
				`${toString(m)} is not a method in ${Base.name}`,
			)
		}

		assumeType<MethodKey<Base>>(m)

		// eslint-disable-next-line security/detect-object-injection
		if (thisArg[m] !== Base.prototype[m]) {
			throw new VoltisoUtilError(
				`method ${toString(m)} is final (cannot override)`,
			)
		}
	}
}
