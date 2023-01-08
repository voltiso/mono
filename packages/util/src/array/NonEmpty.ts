// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type NonEmpty<X> = [X, ...X[]]
export type NonEmptyReadonly<X> = readonly [X, ...(readonly X[])]

export function isNonEmpty<X>(array: readonly X[]): array is NonEmptyReadonly<X>
export function isNonEmpty<X>(array: X[]): array is NonEmpty<X>

export function isNonEmpty<X>(
	array: readonly X[],
): array is NonEmptyReadonly<X> {
	return array.length > 0
}

export function isEmpty(array: readonly unknown[]): array is readonly []
export function isEmpty(array: unknown[]): array is []

export function isEmpty(array: readonly unknown[]): array is readonly [] {
	return array.length === 0
}
