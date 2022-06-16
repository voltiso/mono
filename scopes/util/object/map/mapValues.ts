import { getEntries } from '../key-value'

type Mapping<Obj extends object> = {
	[key in keyof Obj]: (value: Obj[key]) => Obj[key]
}[keyof Obj]

export function mapValues<Obj extends object, M extends Mapping<Obj>>(
	obj: Obj,
	mapping: M
): Obj {
	const res = {} as Obj

	for (const [key, val] of getEntries(obj)) {
		res[key] = mapping(val)
	}

	return res
}
