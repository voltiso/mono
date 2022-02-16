import { Assert } from '../assert'

// type IsOptional<T, k extends keyof T, TT = true, FF = false> = {} extends { [kk in k]: T[kk] } ? TT : FF

/**
 * Check if `T[k]` is optional
 */
export type IsOptional<T, k extends keyof T, TT = true, FF = false> = [T] extends [{ [kk in k]-?: T[kk] }] ? FF : TT

Assert<IsOptional<{ a?: 1; b: 2 }, 'a'>, true>()
Assert<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
Assert<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
Assert<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
