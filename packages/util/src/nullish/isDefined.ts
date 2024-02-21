// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isDefined<X>(x: X): x is Exclude<X, undefined | void> {
	// eslint-disable-next-line unicorn/no-typeof-undefined
	return typeof x !== 'undefined'
}
