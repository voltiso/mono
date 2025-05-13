// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '_'
import { VoltisoUtilError } from '_/error'

import { hasProperty } from '~/object/get-set/get/hasProperty/hasProperty'
import type { UnknownProperty } from '~/object/UnknownProperty'
import { stringFrom } from '~/string'

type MethodKey<O> = string &
	{
		[k in keyof O]: O[k] extends (this: O, ...args: never[]) => unknown
			? k
			: never
	}[keyof O]

/**
 * Runtime check if final methods have not been overridden
 *
 * @throws `VoltisoUtilError` if a method has been overridden
 */
export function final<
	Base extends object,
	Keys extends (keyof Base | UnknownProperty)[],
>(
	thisArg: Record<MethodKey<Base>, unknown>,
	Base: {
		name: string
		prototype: Base
	},
	keys: Keys,
): void {
	for (const m of keys) {
		if (
			!hasProperty(Base.prototype, m) ||
			typeof Base.prototype[m] !== 'function'
		) {
			throw new VoltisoUtilError(
				`${stringFrom(m)} is not a method in ${Base.name}`,
			)
		}

		$AssumeType<MethodKey<Base>>(m)

		if (thisArg[m] !== Base.prototype[m]) {
			throw new VoltisoUtilError(
				`method ${stringFrom(m)} is final (cannot override)`,
			)
		}
	}
}

/**
 * Runtime check if final methods have not been overridden
 *
 * @throws `VoltisoUtilError` if a method has been overridden
 * @strip 👗 Use `@voltiso/transform/strip` to strip from production code
 */
export function $final<
	Base extends object,
	Keys extends (keyof Base | UnknownProperty)[],
>(
	thisArg: Record<MethodKey<Base>, unknown>,
	Base: {
		name: string
		prototype: Base
	},
	keys: Keys,
): void {
	// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
	return final(thisArg, Base, keys)
}
