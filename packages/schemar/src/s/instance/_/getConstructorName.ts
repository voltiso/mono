export function getConstructorName(x: unknown): string | undefined {
	type T = { constructor?: { name?: string } } | undefined
	return (x as T)?.constructor?.name
}
