export function add(a: number, b: number): number
export function add(a: bigint, b: bigint): bigint
export function add(a: number, b: bigint): bigint
export function add(a: bigint, b: number): bigint
export function add(a: number | bigint, b: number | bigint): number | bigint

export function add(a: number | bigint, b: number | bigint): number | bigint {
	if (typeof a === 'bigint' || typeof b === 'bigint')
		return BigInt(a) + BigInt(b)

	return a + b
}
