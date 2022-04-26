export type NonEmpty<X> = [X, ...X[]]
export type NonEmptyReadonly<X> = readonly [X, ...(readonly X[])]

export function isNonEmpty<X>(arr: readonly X[]): arr is NonEmptyReadonly<X>
export function isNonEmpty<X>(arr: X[]): arr is NonEmpty<X>

export function isNonEmpty<X>(arr: readonly X[]): arr is NonEmptyReadonly<X> {
	return arr.length > 0
}

export function isEmpty(arr: readonly unknown[]): arr is readonly []
export function isEmpty(arr: unknown[]): arr is []

export function isEmpty(arr: readonly unknown[]): arr is readonly [] {
	return arr.length === 0
}
