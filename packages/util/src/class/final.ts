// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '~/$strip'
import { VoltisoUtilError } from '~/error/VoltisoUtilError'
import { hasProperty } from '~/object/get-set/get/hasProperty/hasProperty'
import type { UnknownProperty } from '~/object/UnknownProperty'
import { stringFrom } from '~/string'

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
				`${stringFrom(m)} is not a method in ${Base.name}`,
			)
		}

		$AssumeType<MethodKey<Base>>(m)

		// eslint-disable-next-line security/detect-object-injection
		if (thisArg[m] !== Base.prototype[m]) {
			throw new VoltisoUtilError(
				`method ${stringFrom(m)} is final (cannot override)`,
			)
		}
	}
}
