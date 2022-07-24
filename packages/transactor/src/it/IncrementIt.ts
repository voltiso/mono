// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const IS_INCREMENT_IT = Symbol('IS_INCREMENT_IT')

export class IncrementIt {
	readonly [IS_INCREMENT_IT] = true as const

	n: number

	constructor(n: number) {
		this.n = n
	}
}
export const incrementIt = (i: number): IncrementIt => new IncrementIt(i)

export function isIncrementIt(x: unknown): x is IncrementIt {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IncrementIt | null)?.[IS_INCREMENT_IT])
}
