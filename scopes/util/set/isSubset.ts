export function isSubset<T>(a: Set<T>, b: Set<T>) {
	for (const x of a) if (!b.has(x)) return false
	return true
}
