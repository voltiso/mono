import { IsTruthy } from './truthy-falsy'

export type Not_B<A extends boolean, T = true, F = false> = A extends true ? F : T
export type Not<A, T = true, F = false> = Not_B<IsTruthy<A>, T, F>
