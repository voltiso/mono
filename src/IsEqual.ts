/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import { SmartFlatten } from './object/flatten/SmartFlatten'

/**
 * Is either a subtype of another one?
 */
export type IsRelated<A, B, T = true, F = false> = A extends B ? T : B extends A ? T : F

/**
 * extends 2-way
 */
export type IsCompatible<A, B, T = true, F = false> = [A, B] extends [B, A] ? T : F

/**
 * is (very) strictly equal https://stackoverflow.com/a/52473108/3570903
 */
type IsAlmostSame<A, B, T = true, F = false> = (<X>() => X extends B ? 1 : 0) extends <X>() => X extends A ? 1 : 0
	? T
	: F

type IsIdenticalIfFunction<A, B> = [A] extends [(this: infer ThisA, ...args: any[]) => any]
	? [B] extends [(this: infer ThisB, ...args: any[]) => any]
		? IsIdentical<ThisA, ThisB>
		: true
	: true

// type IsIdenticalIfFunction<A, B> = IsIdentical<ThisParameterType<A>, ThisParameterType<B>>

/**
 * Extends 2-way, and is (very) strictly equal
 */
export type IsIdentical<A, B, T = true, F = false> = [IsCompatible<A, B>] extends [true]
	? [IsAlmostSame<A, B>] extends [true]
		? [IsIdenticalIfFunction<A, B>] extends [true]
			? T
			: F
		: F
	: F

/**
 * Same as IsIdentical, but less strict for intersections: {a:1} & {b:1} === {a:1; b:1}
 *
 * Recommended!
 */
export type IsEqual<A, B, T = true, F = false> = IsIdentical<SmartFlatten<A>, SmartFlatten<B>, T, F>
