/**
 * Has index signature?
 */
export type HasIndexSignature<
	X extends object,
	T = true,
	F = false
> = string extends keyof X ? T : number extends keyof X ? T : F
