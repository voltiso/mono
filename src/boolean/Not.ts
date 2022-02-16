import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { IsTruthy } from './truthy-falsy'

export type Not_B<A extends boolean, T = true, F = false> = A extends true ? F : T
export type Not<A, T = true, F = false> = Not_B<IsTruthy<A>, T, F>

Assert<IsCompatible<Not<true>, false>>()
Assert<IsCompatible<Not<false>, true>>()
Assert<IsCompatible<Not<boolean>, boolean>>()
