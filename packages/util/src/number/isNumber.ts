// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type IsNumber<A, T = true, F = false> = A extends number ? T : F
export type IsSuperNumber<A, T = true, F = false> = number extends A ? T : F

export function isNumber(x: unknown): x is number {
	return typeof x === 'number'
}
