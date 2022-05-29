// import { Value } from './value'

/**
 * The built-in `Partial` doesn't work properly (@see `VPartial.test.ts`), so we implement our own
 *  - Prefixed with `V` to resolve ambiguity with the built-in version (auto-imports, etc.)
 * */
export type VPartial<Obj> = Obj extends unknown
	? {
			// [key in keyof Obj]?: Value<Obj, key>
			[key in keyof Obj]?: Obj[key]
	  }
	: never
