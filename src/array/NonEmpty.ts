export type NonEmpty<X> = [X, ...X[]]

export function isNonEmpty<X>(arr: X[]): arr is NonEmpty<X> {
	return Boolean(arr.length)
}
