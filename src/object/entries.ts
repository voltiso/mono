export type Entry<O extends object> = { [k in keyof O]: [k, O[k]] }[keyof O]

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
		o[k] = v
	} else {
		const [o, k, v] = args as [O, E[0], E[1]]
		o[k] = v as O[E[0]]
	}
}
