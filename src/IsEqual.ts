import { Assert } from '.'
import { SmartFlatten } from './object/flatten/SmartFlatten'

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

/**
 * Extends 2-way, and is (very) strictly equal https://stackoverflow.com/a/52473108/3570903
 */
export type IsIdentical<A, B, T = true, F = false> = [IsCompatible<A, B>] extends [true]
	? [IsAlmostSame<A, B>] extends [true]
		? T
		: F
	: F

/**
 * Same as IsSame, but less strict for intersections: {a:1} & {b:1} === {a:1; b:1}
 *
 * Recommended!
 */
export type IsEqual<A, B, T = true, F = false> = IsIdentical<SmartFlatten<A>, SmartFlatten<B>, T, F>

// eslint-disable-next-line jest/require-hook
Assert<IsCompatible<{ a: 1 }, { a: 1 | undefined }>, false>()
