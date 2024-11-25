// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function add(a: number, b: number): number
export function add(a: bigint, b: bigint): bigint
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function add(a: number, b: bigint): bigint
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function add(a: bigint, b: number): bigint
export function add(a: number | bigint, b: number | bigint): number | bigint

// eslint-disable-next-line sonarjs/function-return-type
export function add(a: number | bigint, b: number | bigint): number | bigint {
	if (typeof a === 'bigint' || typeof b === 'bigint')
		return BigInt(a) + BigInt(b)

	return a + b
}
