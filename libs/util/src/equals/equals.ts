// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDate } from '~/date'
import { isMap, isSet } from '~/map-set'
import type { Suggest } from '~/object'
import { isObject } from '~/object'
import { isRegex } from '~/regex'

import { arrayEquals } from './arrayEquals'
import { dateEquals } from './dateEquals'
import { mapEquals } from './mapEquals'
import { ownPropertiesEqual } from './objectEquals'
import { regexEquals } from './regexEquals'
import { setEquals } from './setEquals'

export interface WithEqualsFunction {
	equals(other: unknown): boolean
}

export function isWithEqualsFunction(x: unknown): x is WithEqualsFunction {
	return typeof (x as WithEqualsFunction | null)?.equals === 'function'
}

//

// export type EqualsOptions = {
// 	includeStringKeys: boolean
// 	includeSymbolKeys: boolean
// 	includeNonOwn: boolean
// }

// export const defaultEqualsOptions = {
// 	includeStringKeys: true,
// 	includeSymbolKeys: true,
// 	includeNonOwn: false
// }

// export type DefaultEqualsOptions = typeof defaultEqualsOptions

//

/**
 * Strict `equals`
 *
 * - ✅ Symbol keys included
 * - ⚠️ Requires exactly same prototypes
 * - ❌ Non-enumerable keys NOT included (as usually desired)
 * - ❌ Non-own (prototype-chain) keys NOT included
 */

export function equals<A, B extends Suggest<A>>(
	a: A,
	b: B,
	// partialOptions: Readonly<Partial<EqualsOptions>>,
): a is typeof a & typeof b {
	// const options: EqualsOptions = { ...defaultEqualsOptions, ...partialOptions }

	// @ts-expect-error WTF
	if (a === b) return true

	if (isWithEqualsFunction(a)) return a.equals(b)
	if (isWithEqualsFunction(b)) return b.equals(a)

	if (!isObject(a) || !isObject(b)) {
		return Number.isNaN(a) && Number.isNaN(b)
	}

	if (a.constructor !== b.constructor) return false

	if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false // ! may want to disable if non-own keys are allowed

	/**
	 * Would work without this anyway - but better to check for `.length` first
	 * BEFORE `objectEquals`
	 */
	if (Array.isArray(a) && Array.isArray(b)) return arrayEquals(a, b)

	//

	// if (isPlainObject(a)) {
	// $assert(isPlainObject(b))

	/** Good for plain objects - but check instances of other stuff too */
	if (!ownPropertiesEqual(a, b)) return false

	// return true
	// }

	//

	// ⬇️ Non-plain object ⬇️

	// if(Array.isArray(a) && Array.isArray(b)) return arrayEquals(a,b)

	if (isSet(a) && isSet(b)) return setEquals(a, b)
	if (isMap(a) && isMap(b)) return mapEquals(a, b)
	if (isDate(a) && isDate(b)) return dateEquals(a, b)
	if (isRegex(a) && isRegex(b)) return regexEquals(a, b)

	// generic

	// return false

	return true
}
