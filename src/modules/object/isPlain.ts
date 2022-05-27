export function isPlain(x: unknown): x is object {
	const ctor = (x as object | null)?.constructor
	return ctor?.name === 'Object'
}
