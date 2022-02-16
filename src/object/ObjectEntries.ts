export type ObjectEntry<O extends object> = { [k in keyof O]: [k, O[k]] }[keyof O]

// export type ObjectEntryRelaxed<O extends object> = [keyof O, O[keyof O]]

export function objectEntries<O extends object>(o: O) {
	return Object.entries(o) as ObjectEntry<O>[]
}

export function objectSet<O extends object, E extends ObjectEntry<O>>(o: O, [k, v]: E) {
	o[k] = v
}
