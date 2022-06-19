export function underscoredNonEnumerable(obj: object): void {
	Object.keys(obj)
		.filter(k => k.startsWith('_'))
		.forEach(k => Object.defineProperty(obj, k, { enumerable: false }))
}
