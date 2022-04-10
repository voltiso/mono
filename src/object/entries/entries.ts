/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type Entry<O extends object> = object extends O
	? [string | number | symbol, unknown]
	: { [k in keyof O]: [k, O[k]] }[keyof O]

// export type ObjectEntryRelaxed<O extends object> = [keyof O, O[keyof O]]

export function entries<O extends object>(o: O) {
	return Object.entries(o) as Entry<O>[]
}

export function set<O extends object, E extends Entry<O>>(o: O, k: E[0], v: E[1]): void
export function set<O extends object, E extends Entry<O>>(o: O, entry: E): void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set<O extends object, E extends Entry<O>>(...args: [O, E] | [O, E[0], E[1]]) {
	if (args.length === 2) {
		const [o, [k, v]] = args as [O, E]
		o[k as keyof O] = v as any
	} else {
		const [o, k, v] = args as [O, E[0], E[1]]
		o[k as keyof O] = v as any
	}
}
