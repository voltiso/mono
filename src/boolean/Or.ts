import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { IsTruthy } from './truthy-falsy'

export type Or_B<A extends boolean, B extends boolean, T = true, F = false> = A extends false
	? B extends false
		? F
		: T
	: T
export type Or<A, B, T = true, F = false> = Or_B<IsTruthy<A>, IsTruthy<B>, T, F>

Assert<IsCompatible<Or<true, true>, true>>()
Assert<IsCompatible<Or<true, false>, true>>()
Assert<IsCompatible<Or<false, boolean>, boolean>>()
Assert<IsCompatible<Or<true, boolean>, true>>()
Assert<IsCompatible<Or<boolean, boolean>, boolean>>()
