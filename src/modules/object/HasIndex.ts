/**
 * Has index signature?
 */
export type HasIndex<
	X extends object,
	T = true,
	F = false
> = string extends keyof X ? T : number extends keyof X ? T : F
