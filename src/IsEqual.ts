/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Assert } from './assert'
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

Assert<IsCompatible<{}, Record<string, any>>, true>() // hmm...
Assert<IsIdentical<{}, Record<string, any>>, false>()
Assert<IsEqual<{}, Record<string, any>>, false>()

Assert<IsCompatible<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>, true>()
Assert<IsIdentical<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>, false>() // oops...
Assert<IsEqual<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>, true>()

Assert<IsCompatible<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>, true>()
Assert<IsIdentical<{ x: { a: 1; b: 1 } }, { x: { a: 1 } & { b: 1 } }>, false>() // oops...
Assert<IsEqual<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>, true>()

Assert<IsCompatible<{ a: 1 }, { a: 1 | undefined }>, false>()
Assert<IsIdentical<{ a: 1 }, { a: 1 | undefined }>, false>()
Assert<IsEqual<{ a: 1 }, { a: 1 | undefined }>, false>()

Assert<IsCompatible<{ a?: 1 }, { a: 1 | undefined }>, false>()
Assert<IsIdentical<{ a?: 1 }, { a: 1 | undefined }>, false>()
Assert<IsEqual<{ a?: 1 }, { a: 1 | undefined }>, false>()

Assert<IsCompatible<{ a?: 1 }, { a?: 1 | undefined }>, false>()
Assert<IsIdentical<{ a?: 1 }, { a?: 1 | undefined }>, false>()
Assert<IsEqual<{ a?: 1 }, { a?: 1 | undefined }>, false>()

Assert<IsCompatible<any, unknown>, true>() // hmm...
Assert<IsIdentical<any, unknown>, false>()
Assert<IsEqual<any, unknown>, false>()

type Rec = Rec[] | string
Assert<IsCompatible<Rec, Rec[] | string>>()
Assert<IsIdentical<Rec, Rec[] | string>>()
Assert<IsEqual<Rec, Rec[] | string>>()
