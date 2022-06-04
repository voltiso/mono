export type Merge2Trivial_<A, B> = {
	[k in keyof A | keyof B]: k extends keyof B
		? B[k]
		: k extends keyof A
		? A[k]
		: never
}

export type Merge2Trivial<A extends object, B extends object> = Merge2Trivial_<
	A,
	B
>
