export function isPlain(x: unknown): x is object {
	return (x as object).constructor === Object
}