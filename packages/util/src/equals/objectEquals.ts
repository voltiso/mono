import { assertNotPolluting } from '~/object'
import { equals } from './equals'
import { setEquals } from './setEquals'

export function objectEquals(a: object, b: object) {
	const aKeysArr = Reflect.ownKeys(a)
	const bKeysArr = Reflect.ownKeys(b)

	if (aKeysArr.length !== bKeysArr.length) return false

	const aKeys = new Set(aKeysArr)
	const bKeys = new Set(bKeysArr)

	if (!setEquals(aKeys, bKeys)) return false

	for (const key of aKeys) {
		assertNotPolluting(key)
		if (!equals(a[key as never], b[key as never])) return false
	}

	return true
}
