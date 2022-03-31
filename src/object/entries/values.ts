export function values<O extends object>(o: O): O[keyof O][] {
	return Object.values(o) as O[keyof O][]
}
