import { Entry } from './Entry'

/**
 * Similar to `Object.entries(obj)`, but also returns symbol properties
 *  - Typed more strict than `Object.entries()`
 *  - Does not return non-enumerable properties (just like `Object.entries()`)
 * */
export function getEntries<Obj extends object>(obj: Obj): Entry<Obj>[] {
	const r = Object.entries(obj) as unknown as [string | symbol, unknown][]
	for (const k of Object.getOwnPropertySymbols(obj) as (symbol & keyof Obj)[]) {
		if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable) r.push([k, obj[k]])
	}
	return r as never
}
