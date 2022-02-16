import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { IsTruthy } from './truthy-falsy'

export type And_B<A extends boolean, B extends boolean, T = true, F = false> = A extends true
	? B extends true
		? T
		: F
	: F
export type And<A, B, T = true, F = false> = And_B<IsTruthy<A>, IsTruthy<B>, T, F>

Assert<IsCompatible<And<true, true>, true>>()
Assert<IsCompatible<And<true, false>, false>>()
Assert<IsCompatible<And<false, boolean>, false>>()
Assert<IsCompatible<And<true, boolean>, boolean>>()
Assert<IsCompatible<And<boolean, boolean>, boolean>>()
