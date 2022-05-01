export function freeze<O extends object>(o: O, ...properties: (keyof O)[]) {
	for (const p of properties) {
		Object.defineProperty(o, p, {
			configurable: false,
			writable: false,
			value: o[p],
		})
	}
}
