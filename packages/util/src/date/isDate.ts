export function isDate(x: unknown): x is Date {
	return !!(x as Date | null)?.toISOString
}
