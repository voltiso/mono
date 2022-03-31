export function widen<X>(x: X) {
	return {
		toType<T>(): X extends T ? T : never {
			return x as unknown as X extends T ? T : never
		},
	}
}
