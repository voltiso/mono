import { zip } from '~/functional'
import { equals } from './equals'

export function arrayEquals<
	A extends readonly unknown[],
	B extends readonly unknown[],
>(a: A, b: B) {
	if (a.length !== b.length) return false
	for (const [aa, bb] of zip(a, b)) if (!equals(aa, bb)) return false
	return true
}
