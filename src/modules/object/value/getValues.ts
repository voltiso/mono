import { Value } from './Value'

export type Values<O extends object> = Value<O, keyof O>[]

/**
 * Similar to `Object.values(obj)`, but also iterates symbol properties
 *  - Typed more strict than `Object.values()`
 *  - Does not iterate non-enumerable properties (just like `Object.values()`)
 * */
export function getValues<Obj extends object>(obj: Obj): Values<Obj> {
	const r = Object.values(obj) as Values<Obj>
	for (const k of Object.getOwnPropertySymbols(obj) as (symbol & keyof Obj)[]) {
		if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable)
			r.push(obj[k] as never)
	}
	return r
}
