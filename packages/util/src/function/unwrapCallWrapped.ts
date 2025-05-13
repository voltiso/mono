// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type CallWrapped<T> = () => MaybeCallWrapped<T>
export type MaybeCallWrapped<T> = T | CallWrapped<T>

export function unwrapCallWrapped<T>(maybeCallWrapped: MaybeCallWrapped<T>): T {
	if (typeof maybeCallWrapped === 'function')
		return unwrapCallWrapped((maybeCallWrapped as () => MaybeCallWrapped<T>)())

	return maybeCallWrapped
}
