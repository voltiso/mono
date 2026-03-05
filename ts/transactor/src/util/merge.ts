// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @public */
export const merge = <A, B>(a: A, b: B): Omit<A, keyof B> & B => ({
	...a,
	...b,
})
