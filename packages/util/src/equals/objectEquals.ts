// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertNotPolluting } from '~/object'

import { equals } from './equals'
import { setEquals } from './setEquals'

/**
 * Uses `Reflect.ownKeys()`
 *
 * Includes:
 *
 * - ✅ `symbol` keys
 * - ✅ Non-enumerable keys
 *
 * Excludes:
 *
 * - ❌ Prototype-chain inherited properties
 */
export function ownPropertiesEqual(a: object, b: object) {
	const aKeysArr = Reflect.ownKeys(a)
	const bKeysArr = Reflect.ownKeys(b)

	if (aKeysArr.length !== bKeysArr.length) return false

	const aKeys = new Set(aKeysArr)
	const bKeys = new Set(bKeysArr)

	if (!setEquals(aKeys, bKeys)) return false

	for (const key of aKeys) {
		assertNotPolluting(key)
		if (!equals(a[key as never], b[key as never])) return false // ! TODO: make configurable - different `equals`
	}

	return true
}

/**
 * Uses `for...in`
 *
 * Includes:
 *
 * - ⚠️ Prototype-chain inherited properties
 *
 * Excludes:
 *
 * - ❌ `symbol` keys
 * - ❌ Non-enumerable keys
 */
export function forInEquals(a: object, b: object) {
	const aKeysArr = []
	const bKeysArr = []

	// eslint-disable-next-line guard-for-in
	for (const key in a) aKeysArr.push(key)
	// eslint-disable-next-line guard-for-in
	for (const key in b) bKeysArr.push(key)

	const aKeys = new Set(aKeysArr)
	const bKeys = new Set(bKeysArr)

	if (!setEquals(aKeys, bKeys)) return false

	for (const key of aKeys) {
		assertNotPolluting(key)
		if (!equals(a[key as never], b[key as never])) return false // ! TODO: make configurable - different `equals`
	}

	return true
}

/**
 * Uses `Object.keys()`
 *
 * Excludes:
 *
 * - ❌ Non-enumerable keys
 * - ❌ Prototype-chain inherited properties
 * - ❌ `symbol` keys
 */
export function entriesEqual(a: object, b: object) {
	const aKeysArr = Object.keys(a)
	const bKeysArr = Object.keys(b)

	const aKeys = new Set(aKeysArr)
	const bKeys = new Set(bKeysArr)

	if (!setEquals(aKeys, bKeys)) return false

	for (const key of aKeys) {
		assertNotPolluting(key)
		if (!equals(a[key as never], b[key as never])) return false // ! TODO: make configurable - different `equals`
	}

	return true
}
