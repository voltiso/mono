import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { IsTruthy } from './truthy-falsy'

export type Xor_B<A extends boolean, B extends boolean, T = true, F = false> = A extends true
	? B extends true
		? F
		: T
	: B extends true
	? T
	: F
export type Xor<A, B, T = true, F = false> = Xor_B<IsTruthy<A>, IsTruthy<B>, T, F>

Assert<IsCompatible<Xor<false, true>, true>>()
Assert<IsCompatible<Xor<true, false>, true>>()
Assert<IsCompatible<Xor<true, true>, false>>()
Assert<IsCompatible<Xor<false, false>, false>>()

Assert<IsCompatible<Xor<false, boolean>, boolean>>()
Assert<IsCompatible<Xor<true, boolean>, boolean>>()
