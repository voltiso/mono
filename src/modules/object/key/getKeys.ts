import { _ } from '..'

export type Key<O> = keyof O
export type Keys<O> = _<Key<O>[]>

/**
 * Similar to `Object.keys(obj)`, but also returns symbol properties
 *  - Typed more strict than `Object.keys()`
 *  - Does not return non-enumerable properties (just like `Object.keys()`)
 * */
export function getKeys<Obj extends object>(obj: Obj): Keys<Obj> {
	const r = Object.keys(obj) as (string | symbol)[]
	for (const k of Object.getOwnPropertySymbols(obj) as (symbol & keyof Obj)[]) {
		if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable) r.push(k)
	}
	return r as never
}
