import { Assert } from '../assert'

export type CanBeUndefined<T, k extends keyof T, TT = true, FF = false> = {
	[kk in keyof T]: T[kk] | (kk extends k ? undefined : never)
} extends T
	? TT
	: FF

Assert<CanBeUndefined<{ x: 0; a: 1 }, 'a'>, false>()
Assert<CanBeUndefined<{ x: 0; a: 1 | undefined }, 'a'>, true>()
Assert<CanBeUndefined<{ x: 0; a?: 1 }, 'a'>, false>()
Assert<CanBeUndefined<{ x: 0; a?: 1 | undefined }, 'a'>, true>()
