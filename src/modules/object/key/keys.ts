export type Keys<O> = (keyof O)[]

export function keys<O extends object>(o: O): Keys<O> {
	return Object.keys(o) as never
}
