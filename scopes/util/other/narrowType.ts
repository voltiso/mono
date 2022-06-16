export function narrow<X>(x: X) {
	return {
		toType<T extends X>() {
			return x as T
		},
	}
}
