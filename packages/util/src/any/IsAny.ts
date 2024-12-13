// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** https://stackoverflow.com/a/68633327/1123898 */
export type IsAny<T> = unknown extends T
	? [keyof T] extends [never]
		? false
		: true
	: false

// /** https://stackoverflow.com/a/55541672/1123898
//  *  (this stopped working for imported error-types in newer TS)
//  */
// export type IsAny<X, T = true, F = false> = 0 extends 1 & X ? T : F
